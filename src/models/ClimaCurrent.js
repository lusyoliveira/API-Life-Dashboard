import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const ClimaCurrent = sequelize.define("ClimaCurrent", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  climaId: { type: DataTypes.INTEGER, allowNull: false },
  time: { type: DataTypes.DATE, allowNull: true },
  interval: { type: DataTypes.INTEGER, allowNull: true },
  weather_code: { type: DataTypes.INTEGER, allowNull: true },
  temperature_2m: { type: DataTypes.DOUBLE, allowNull: true },
  relative_humidity_2m: { type: DataTypes.INTEGER, allowNull: true },
  apparent_temperature: { type: DataTypes.DOUBLE, allowNull: true },
  is_day: { type: DataTypes.INTEGER, allowNull: true },
  wind_speed_10m: { type: DataTypes.DOUBLE, allowNull: true },
  wind_direction_10m: { type: DataTypes.INTEGER, allowNull: true },
  wind_gusts_10m: { type: DataTypes.DOUBLE, allowNull: true },
  precipitation: { type: DataTypes.INTEGER, allowNull: true },
  rain: { type: DataTypes.INTEGER, allowNull: true },
  showers: { type: DataTypes.INTEGER, allowNull: true },
  snowfall: { type: DataTypes.INTEGER, allowNull: true },
  cloud_cover: { type: DataTypes.INTEGER, allowNull: true },
  pressure_msl: { type: DataTypes.DOUBLE, allowNull: true },
  surface_pressure: { type: DataTypes.DOUBLE, allowNull: true }
}, {
  tableName: "clima_current",
  timestamps: false
});


export default ClimaCurrent;

