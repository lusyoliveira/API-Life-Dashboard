import Service from './Services.js';
import Curso from "../models/Cursos.js";

class CursoServices extends Service {
    constructor() {
        super(Curso);
    }

}

export default CursoServices;