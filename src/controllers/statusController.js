import Controller from "./Controller.js";
import StatusServices  from "../servicos/statusService.js";

const estado = new StatusServices();

class StatusController extends Controller {
    constructor() {
        super(estado);
    }
};

export default new StatusController();