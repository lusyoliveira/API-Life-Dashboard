import Controller from "./Controller.js";
import CatalogoServices  from "../servicos/catalogoService.js";

const catalogo = new CatalogoServices();

class CatalogoController extends Controller {
    constructor() {
        super(catalogo);
    }
};

export default new CatalogoController();