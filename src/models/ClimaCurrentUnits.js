import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const ClimaCurrentUnits = sequelize.define("ClimaCurrentUnits", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  climaId: { type: DataTypes.INTEGER, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: true },
  interval: { type: DataTypes.STRING, allowNull: true },
  weather_code: { type: DataTypes.STRING, allowNull: true },
  temperature_2m: { type: DataTypes.STRING, allowNull: true },
  relative_humidity_2m: { type: DataTypes.STRING, allowNull: true },
  apparent_temperature: { type: DataTypes.STRING, allowNull: true },
  is_day: { type: DataTypes.STRING, allowNull: true },
  wind_speed_10m: { type: DataTypes.STRING, allowNull: true },
  wind_direction_10m: { type: DataTypes.STRING, allowNull: true },
  wind_gusts_10m: { type: DataTypes.STRING, allowNull: true },
  precipitation: { type: DataTypes.STRING, allowNull: true },
  rain: { type: DataTypes.STRING, allowNull: true },
  showers: { type: DataTypes.STRING, allowNull: true },
  snowfall: { type: DataTypes.STRING, allowNull: true },
  cloud_cover: { type: DataTypes.STRING, allowNull: true },
  pressure_msl: { type: DataTypes.STRING, allowNull: true },
  surface_pressure: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: "clima_current_units",
  timestamps: false
});


export default ClimaCurrentUnits;

