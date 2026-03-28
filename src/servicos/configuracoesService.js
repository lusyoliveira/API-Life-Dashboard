import Service from './Services.js';
import Configuracoes from "../models/Configuracoes.js";

class ConfiguracoesServices extends Service {
    constructor() {
        super(Configuracoes);
    }

}

export default ConfiguracoesServices;