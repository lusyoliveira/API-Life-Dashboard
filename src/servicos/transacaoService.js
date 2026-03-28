import Service from './Services.js';
import Transacao from "../models/Transacao.js";

class TransacaoServices extends Service {
    constructor() {
        super(Transacao);
    }

}

export default TransacaoServices;