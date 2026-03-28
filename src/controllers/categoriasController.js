import Controller from "./Controller.js";
import CategoriaServices from "../servicos/categoriasService.js";

const categoria = new CategoriaServices();

class CategoriasController extends Controller {
    constructor() {
        super(categoria);
    }
};

export default new CategoriasController();