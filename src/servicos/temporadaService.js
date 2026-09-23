import Service from './Services.js';
import Temporada from "../models/Temporada.js";

class TemporadaServices extends Service {
    constructor() {
        super(Temporada);
    }

    // Busca todas as temporadas pertencentes a um determinado título do catálogo
    async listarPorCatalogoId(catalogoId) {
        return await this.model.findAll({
            where: { catalogoId },
            order: [['numeroTemporada', 'ASC']]
        });
    }

}

export default TemporadaServices;