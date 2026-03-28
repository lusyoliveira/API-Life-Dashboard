import Controller from "./Controller.js";
import TransacaoServices  from "../servicos/transacaoService.js";

const transacao = new TransacaoServices();

class TransacoesController extends Controller {
    constructor() {
        super(transacao);
    }
};

export default new TransacoesController();