import Service from './Services.js';
import Tipo from "../models/Tipos.js";

class TipoServices extends Service {
    constructor() {
        super(Tipo);
    }

}

export default TipoServices;