import Service from './Services.js';
import Tarefa from "../models/Tarefas.js";

class TarefaServices extends Service {
    constructor() {
        super(Tarefa);
    }

}

export default TarefaServices;