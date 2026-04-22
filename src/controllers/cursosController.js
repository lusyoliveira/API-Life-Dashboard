import Controller from "./Controller.js";
import CursoServices  from "../servicos/cursoService.js";

const curso = new CursoServices();

class CursosController extends Controller {
    constructor() {
        super(curso);
        this.populate = [
            {association: "Area"},
            {association: "Plataforma"},
            {association: "Status"}
        ]
    }
};

export default new CursosController();