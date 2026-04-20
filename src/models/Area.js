import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Area = sequelize.define("Area", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descricao: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "areas",
  timestamps: false
});


export default Area;