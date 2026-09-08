import Controller from "./Controller.js";
import TemporadaServices  from "../servicos/TemporadaService.js";

const temporada = new TemporadaServices();

class TemporadaController extends Controller {
    constructor() {
        super(temporada);
        this.populate = [
            { association: "Catalogo" }
        ];
    }
};

export default new TemporadaController();