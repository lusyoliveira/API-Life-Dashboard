import Controller from "./Controller.js";
import TransacaoServices  from "../servicos/transacaoService.js";

const transacao = new TransacaoServices();

class TransacoesController extends Controller {
    constructor() {
        super(transacao);
        this.populate = [
            {path: "Categoria"},
            {path: "ContaOrigem"},
            {path: "ContaDestino"},
            {path: "Tipo"}
        ]
    }
};

export default new TransacoesController();