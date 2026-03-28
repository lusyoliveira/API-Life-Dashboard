import Controller from "./Controller.js";
import TipoServices  from "../servicos/tipoService.js";

const tipo = new TipoServices();

class TiposController extends Controller {
    constructor() {
        super(tipo);
    }
};

export default new TiposController();