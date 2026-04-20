import Service from './Services.js';
import Tarefa from "../models/Tarefa.js";

class TarefaServices extends Service {
    constructor() {
        super(Tarefa);
    }

}

export default TarefaServices;