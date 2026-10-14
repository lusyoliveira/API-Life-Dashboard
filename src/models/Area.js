import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Area = sequelize.define("Area", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descricao: { 
    type: DataTypes.STRING, 
    allowNull: false,
  validate: {
    notNull: { msg: "Título é obrigatório" },
    notEmpty: { msg: "Título não pode ser enviado em branco" } 
  } }
}, {
  tableName: "areas",
  timestamps: false
});


export default Area;