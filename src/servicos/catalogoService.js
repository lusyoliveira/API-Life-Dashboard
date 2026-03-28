import Service from './Services.js';
import Catalogo from "../models/Catalogo.js";

class CatalogoServices extends Service {
    constructor() {
        super(Catalogo);
    }

}

export default CatalogoServices;