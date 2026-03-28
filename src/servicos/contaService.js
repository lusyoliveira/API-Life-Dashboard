import Service from './Services.js';
import Conta from "../models/Contas.js";

class ContaServices extends Service {
    constructor() {
        super(Conta);
    }

}

export default ContaServices;