import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Usuario = sequelize.define("Usuario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  senha: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "usuarios",
  timestamps: false
});

export default Usuario;