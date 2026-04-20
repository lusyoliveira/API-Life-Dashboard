import Service from './Services.js';
import Conta from "../models/Conta.js";

class ContaServices extends Service {
    constructor() {
        super(Conta);
    }

}

export default ContaServices;