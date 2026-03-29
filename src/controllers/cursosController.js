import Controller from "./Controller.js";
import CursoServices  from "../servicos/cursoService.js";

const curso = new CursoServices();

class CursosController extends Controller {
    constructor() {
        super(curso);
        this.populate = [
            {path: "Assunto"},
            {path: "Escola"},
            {path: "Status"}
        ]
    }
};

export default new CursosController();