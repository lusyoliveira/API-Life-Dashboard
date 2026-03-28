import Service from './Services.js';
import Status from "../models/Status.js";

class StatusServices extends Service {
    constructor() {
        super(Status);
    }

}

export default StatusServices;