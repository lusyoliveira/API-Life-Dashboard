import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Tipo = sequelize.define("Tipo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descricao: { type: DataTypes.STRING, allowNull: false },
  tipo: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "tipos",
  timestamps: false
});

export default Tipo;