import Controller from "./Controller.js";
import TransacaoServices  from "../servicos/transacaoService.js";

const transacao = new TransacaoServices();

class TransacoesController extends Controller {
    constructor() {
        super(transacao);
        this.populate = [
            {association: "Categoria"},
            {association: "ContaOrigem"},
            {association: "ContaDestino"}
        ]
    }
};

export default new TransacoesController();