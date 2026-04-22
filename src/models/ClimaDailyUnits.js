import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const ClimaDailyUnits = sequelize.define("ClimaDailyUnits", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    climaId: { type: DataTypes.INTEGER, allowNull: false },
    time: { type: DataTypes.STRING, allowNull: true },
    weather_code: { type: DataTypes.STRING, allowNull: true },
    temperature_2m_max: { type: DataTypes.STRING, allowNull: true },
    temperature_2m_min: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: "clima_daily_units",
  timestamps: false
});

export default ClimaDailyUnits;
