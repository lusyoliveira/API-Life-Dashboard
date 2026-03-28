import Controller from "./Controller.js";
import TarefaServices  from "../servicos/tarefaService.js";

const tarefa = new TarefaServices();

class TarefaController extends Controller {
    constructor() {
        super(tarefa);
    }
};

export default new TarefaController();