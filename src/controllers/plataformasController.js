import Controller from "./Controller.js";
import PlataformaServices  from "../servicos/plataformaService.js";

const plataformas = new PlataformaServices();

class PlataformaController extends Controller {
    constructor() {
        super(plataformas);
    }   
};

export default new PlataformaController();