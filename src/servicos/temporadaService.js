import Service from './Services.js';
import Temporada from "../models/Temporada.js";

class TemporadaServices extends Service {
    constructor() {
        super(Temporada);
    }

}

export default TemporadaServices;