import mongoose from "mongoose";
 
const climaSchema = new mongoose.Schema({
    name: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    elevation: { type: Number },
    feature_code: { type: String },
    country_code: { type: String },
    admin1_id: { type: Number },
    admin2_id: { type: Number },
    timezone:{ type: String },
    population: { type: Number },
    country_id: { type: Number },
    country: { type: String },
    admin1: { type: String },
    admin2: { type: String },
    current_units: { type: Object },
    current: { type: Object },
    daily_units: { type: Object },
    daily: { type: Object },
    weather_code: { type: Object },
    temperature_2m_max: { type: Object },
    temperature_2m_min: { type: Object }
}, { versionKey: false });

const clima = mongoose.model("clima", climaSchema);

export default clima;