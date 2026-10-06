// Arquivo: servicos/catalogoService.js
import Service from './Services.js';
import Catalogo from "../models/Catalogo.js";

class CatalogoServices extends Service {
    constructor() {
        super(Catalogo);
    }

    // Sobrescreve ou cria um método focado na atualização do progresso
    async atualizarProgressoEpisodios(id, assistidos) {
        // 1. Busca o registro atual para saber o total de episódios existentes
        const registro = await this.buscarPorId(id);
        if (!registro) return null;

        const totalEpisodios = registro.episodios;

        // Validação básica para evitar que o usuário assista mais episódios do que o total do catálogo
        if (assistidos > totalEpisodios) {
            throw new Error(`O número de episódios assistidos (${assistidos}) não pode ser maior que o total disponível (${totalEpisodios}).`);
        }

        // 2. Calcula a porcentagem do progresso (0 a 100)
        // Evita divisão por zero caso o total de episódios seja cadastrado como 0 por engano
        const progressoCalculado = totalEpisodios > 0 
            ? Math.round((assistidos / totalEpisodios) * 100) 
            : 0;

        // 3. Monta o objeto contendo apenas o que queremos alterar
        const dadosAtualizados = {
            assistidos: parseInt(assistidos),
            progresso: progressoCalculado
        };

        // 4. Salva no banco reutilizando a lógica base
        return await this.atualizar(id, dadosAtualizados);
    };

    // Sobrescreve o método criar para aceitar incluir as temporadas e episódios
    async criarCompleto(data) {
        const transaction = await sequelize.transaction();
        try {
            const novoCatalogo = await this.model.create(data, {
                include: [
                    {
                        model: Temporada,
                        as: 'listaTemporadas',
                        include: [
                            {
                                model: Episodio,
                                as: 'listaEpisodios'
                            }
                        ]
                    }
                ],
                transaction
            });

            await transaction.commit();
            return novoCatalogo;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };

    async atualizarCompleto(id, data) {
        const transaction = await sequelize.transaction();
        try {
            // 1. Atualiza dados do catálogo
            await this.model.update(data, { where: { id }, transaction });

            // 2. Se houver temporadas atualizadas no payload:
            if (data.listaTemporadas && Array.isArray(data.listaTemporadas)) {
                
                // Exclui temporadas anteriores (o CASCADE do banco exclui os episódios atrelados a ela)
                await Temporada.destroy({ where: { tituloId: id }, transaction });

                for (const temp of data.listaTemporadas) {
                    temp.tituloId = id; // FK vinculada ao Catálogo
                    
                    const novaTemp = await Temporada.create(temp, { transaction });

                    // Insere os episódios vinculados apenas ao 'temporadaId'
                    if (temp.listaEpisodios && temp.listaEpisodios.length > 0) {
                        const episodiosComFk = temp.listaEpisodios.map(ep => ({
                            ...ep,
                            temporadaId: novaTemp.id // Apenas a FK da temporada é necessária
                        }));
                        
                        await Episodio.bulkCreate(episodiosComFk, { transaction });
                    }
                }
            }

            await transaction.commit();
            return await this.buscarPorId(id);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };
}

export default CatalogoServices;
