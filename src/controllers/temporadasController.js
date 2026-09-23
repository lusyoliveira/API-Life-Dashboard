import Controller from "./Controller.js";
import TemporadaServices from "../servicos/temporadaService.js";

const temporadaService = new TemporadaServices();

class TemporadaController extends Controller {
    constructor() {
        super(temporadaService);
    }

    listarPorCatalogo = async (req, res, next) => {
        try {
            const { catalogoId } = req.params;
            const temporadas = await this.entidadeservice.listarPorCatalogoId(catalogoId);
            return res.status(200).json(temporadas);
        } catch (error) {
            next(error);
        }
    };
}

export default new TemporadaController();