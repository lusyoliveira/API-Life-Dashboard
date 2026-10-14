import Service from './Services.js';
import Episodio from '../models/Episodio.js'; 
import { Temporada, Catalogo } from '../models/associacoes.js';
import CatalogoServices from './catalogoService.js';

const catalogoService = new CatalogoServices();

class EpisodioServices extends Service {
    constructor() {
        super(Episodio);
    }

    // Busca episódios de uma temporada específica
    async listarPorTemporadaId(temporadaId) {
        return await this.model.findAll({
            where: { temporadaId },
            order: [['numeroEpisodio', 'ASC']]
        });
    }

    // Alterna status de assistido, atualiza o episódio e recalcula o progresso do catálogo
    async atualizarAssistido(episodioId, assistido) {
        // 1. Busca o episódio garantindo que traz a Temporada e o Catálogo pai (via associações)
        const episodio = await this.model.findByPk(episodioId, {
            include: [
                {
                    model: Temporada,
                    as: 'Temporada', // Verifique se o alias da associação no seu model está como 'temporada' ou 'Temporada'
                    include: [
                        {
                            model: Catalogo,
                            as: 'Catalogo' // Verifique o alias correspondente no model de Temporada
                        }
                    ]
                }
            ]
        });

        if (!episodio) return null;

        // 2. Atualiza o status do episódio individualmente
        await this.atualizar(episodioId, { assistido });

        // 3. Descobre qual é o ID do catálogo pai
        const temporada = episodio.Temporada || episodio.temporada;
        if (temporada) {
            const catalogo = temporada.Catalogo || temporada.catalogo;
            const catalogoId = catalogo?.id || temporada.tituloId;

            if (catalogoId) {
                // 4. Conta quantos episódios no total deste catálogo estão com assistido: true
                // Busca todas as temporadas deste catálogo e somamos os episódios assistidos
                const temporadasDoCatalogo = await Temporada.findAll({
                    where: { tituloId: catalogoId },
                    include: [{ model: Episodio, as: 'listaEpisodios' }]
                });

                let totalAssistidos = 0;
                temporadasDoCatalogo.forEach(temp => {
                    if (temp.listaEpisodios) {
                        temp.listaEpisodios.forEach(ep => {
                            // Se for o episódio que acabou de ser alterado, usa o novo valor 'assistido', senão usa o valor atual do banco
                            const estaAssistido = (ep.id === Number(episodioId)) ? assistido : ep.assistido;
                            if (estaAssistido) {
                                totalAssistidos++;
                            }
                        });
                    }
                });

                // 5. Atualiza o progresso no catálogo usando o método que você já criou no catalogoService!
                await catalogoService.atualizarProgressoEpisodios(catalogoId, totalAssistidos);
            }
        }

        return episodio;
    }
}

export default EpisodioServices;