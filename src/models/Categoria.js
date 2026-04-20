import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Categoria = sequelize.define("Categoria", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descricao: { type: DataTypes.STRING, allowNull: false },
  tipo: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "categorias",
  timestamps: false
});

export default Categoria;