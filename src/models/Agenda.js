import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Agenda = sequelize.define("Agenda", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  data: { type: DataTypes.DATE, allowNull: false },
  categoriaId: { type: DataTypes.INTEGER, allowNull: false },
  statusId: { type: DataTypes.INTEGER, allowNull: false },
  tipoId: { type: DataTypes.INTEGER, allowNull: false },
  recorrente: { type: DataTypes.BOOLEAN },
  periodicidade: { type: DataTypes.STRING }

}, {
  tableName: "agendas",
  timestamps: false
});

export default Agenda;