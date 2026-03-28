import Service from './Services.js';
import Clima from "../models/Clima.js";

class ClimaServices extends Service {
    constructor() {
        super(Clima);
    }

}

export default ClimaServices;