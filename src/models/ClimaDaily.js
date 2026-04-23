import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const ClimaDaily = sequelize.define("ClimaDaily", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    climaId: { type: DataTypes.INTEGER, allowNull: false },
    time: { type: DataTypes.DATEONLY, allowNull: true },
    weather_code: { type: DataTypes.INTEGER, allowNull: true },
    temperature_2m_max: { type: DataTypes.STRING, allowNull: true },
    temperature_2m_min: { type: DataTypes.STRING, allowNull: true }

}, {
  tableName: "clima_daily",
  timestamps: false
});

export default ClimaDaily;
