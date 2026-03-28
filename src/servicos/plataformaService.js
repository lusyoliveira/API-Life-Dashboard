import Service from './Services.js';
import Plataforma from "../models/Plataforma.js";

class PlataformaServices extends Service {
    constructor() {
        super(Plataforma);
    }

}

export default PlataformaServices;