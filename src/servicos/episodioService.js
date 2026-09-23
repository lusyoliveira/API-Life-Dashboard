import Service from './Services.js';
import Episodio from '../models/Episodio.js'; 

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

    // Alterna status de assistido e atualiza o progresso no catálogo
    async atualizarAssistido(episodioId, assistido) {
        const episodio = await this.buscarPorId(episodioId);
        if (!episodio) return null;

        await this.atualizar(episodioId, { assistido });
        return episodio;
    }
}

export default EpisodioServices;