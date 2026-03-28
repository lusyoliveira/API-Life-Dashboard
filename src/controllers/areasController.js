import Controller from "./Controller.js";
import AreaServices  from "../servicos/areaService.js";

const areas = new AreaServices();

class AreasController extends Controller {
    constructor() {
        super(areas);
    }
};

export default new AreasController();