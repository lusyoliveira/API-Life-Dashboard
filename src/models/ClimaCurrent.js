import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const ClimaCurrent = sequelize.define("ClimaCurrent", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  climaId: { type: DataTypes.INTEGER, allowNull: true },
  time: { type: DataTypes.DATE, allowNull: true },
  interval: { type: DataTypes.INTEGER, allowNull: true },
  weather_code: { type: DataTypes.INTEGER, allowNull: true },
  temperature_2m: { type: DataTypes.FLOAT, allowNull: true },
  relative_humidity_2m: { type: DataTypes.INTEGER, allowNull: true },
  apparent_temperature: { type: DataTypes.FLOAT, allowNull: true },
  is_day: { type: DataTypes.INTEGER, allowNull: true },
  wind_speed_10m: { type: DataTypes.FLOAT, allowNull: true },
  wind_direction_10m: { type: DataTypes.INTEGER, allowNull: true },
  wind_gusts_10m: { type: DataTypes.FLOAT, allowNull: true },
  precipitation: { type: DataTypes.FLOAT, allowNull: true },
  rain: { type: DataTypes.FLOAT, allowNull: true },
  showers: { type: DataTypes.FLOAT, allowNull: true },
  snowfall: { type: DataTypes.FLOAT, allowNull: true },
  cloud_cover: { type: DataTypes.INTEGER, allowNull: true },
  pressure_msl: { type: DataTypes.FLOAT, allowNull: true },
  surface_pressure: { type: DataTypes.FLOAT, allowNull: true }
}, {
  tableName: "clima_current",
  timestamps: false
});


export default ClimaCurrent;

