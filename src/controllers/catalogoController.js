import Controller from "./Controller.js";
import CatalogoServices  from "../servicos/catalogoService.js";

const catalogo = new CatalogoServices();

class CatalogoController extends Controller {
    constructor() {
        super(catalogo);
        this.populate = [
            { path: "Tipo" },
            { path: "Onde" },
            { path: "Status" }
        ];
    }
};

export default new CatalogoController();