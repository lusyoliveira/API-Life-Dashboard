import Controller from "./Controller.js";
import ClimaServices from "../servicos/climaService.js";

const clima = new ClimaServices();

class ClimaController extends Controller {
    constructor() {
        super(clima);
        this.populate = [
            { association: "ClimaCurrent" },
            { association: "ClimaCurrentUnits" },
            { association: "ClimaDaily" },
            { association: "ClimaDailyUnits" }
        ];
    }
};

export default new ClimaController();