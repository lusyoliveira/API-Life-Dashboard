import Controller from "./Controller.js";
import ContaServices  from "../servicos/contaService.js";

const contas = new ContaServices();

class ContasController extends Controller {
    constructor() {
        super(contas);
    }
};

export default new ContasController();