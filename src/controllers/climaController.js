import Controller from "./Controller.js";
import ClimaServices from "../servicos/climaService.js";

const clima = new ClimaServices();

class ClimaController extends Controller {
    constructor() {
        super(clima);
    }
};

export default new ClimaController();