import Service from './Services.js';
import Curso from "../models/Curso.js";

class CursoServices extends Service {
    constructor() {
        super(Curso);
    }

}

export default CursoServices;