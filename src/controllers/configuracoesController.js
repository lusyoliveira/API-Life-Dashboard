import Controller from "./Controller.js";
import ConfiguracoesServices from "../servicos/configuracoesService.js";

const configuracoes = new ConfiguracoesServices();

class ConfiguracoesController extends Controller {
    constructor() {
        super(configuracoes);
    }
};

export default new ConfiguracoesController();