import Service from './Services.js';
import Categoria from "../models/Categoria.js";

class CategoriaServices extends Service {
    constructor() {
        super(Categoria);
    }

}

export default CategoriaServices;