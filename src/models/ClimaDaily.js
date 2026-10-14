import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const ClimaDaily = sequelize.define("ClimaDaily", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    climaId: { type: DataTypes.INTEGER, allowNull: false,
    validate: {
      notNull: { msg: "ID identificado do clima é obrigatório" },
      notEmpty: { msg: "ID identificado do clima não pode ser enviado em branco" } 
    }
  },
    time: { type: DataTypes.DATEONLY, allowNull: true },
    weather_code: { type: DataTypes.INTEGER, allowNull: true },
    temperature_2m_max: { type: DataTypes.STRING, allowNull: true },
    temperature_2m_min: { type: DataTypes.STRING, allowNull: true }

}, {
  tableName: "clima_daily",
  timestamps: false
});

export default ClimaDaily;
