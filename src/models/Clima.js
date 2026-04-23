import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Clima = sequelize.define("Clima", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    latitude: { type: DataTypes.NUMBER },
    longitude: { type: DataTypes.NUMBER },
    elevation: { type: DataTypes.NUMBER },
    feature_code: { type: DataTypes.STRING },
    country_code: { type: DataTypes.STRING },
    admin1_id: { type: DataTypes.NUMBER },
    admin2_id: { type: DataTypes.NUMBER },
    timezone:{ type: DataTypes.STRING },
    population: { type: DataTypes.NUMBER },
    country_id: { type: DataTypes.NUMBER },
    country: { type: DataTypes.STRING },
    admin1: { type: DataTypes.STRING },
    admin2: { type: DataTypes.STRING }
}, { 
    tableName: "climas",
    timestamps: false
});

export default Clima;