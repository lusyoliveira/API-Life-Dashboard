import Service from './Services.js';
import Configuracoes from "../models/Configuracao.js";

class ConfiguracoesServices extends Service {
    constructor() {
        super(Configuracoes);
    }

}

export default ConfiguracoesServices;