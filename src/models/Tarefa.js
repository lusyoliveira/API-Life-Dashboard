import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Tarefa = sequelize.define("Tarefa", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tarefa: { type: DataTypes.STRING, allowNull: false },
    adicionado: { type: DataTypes.DATE, allowNull: false },
    feito: { type: DataTypes.BOOLEAN, allowNull: false }
}, { 
    tableName: "tarefas",
    timestamps: false
});

export default Tarefa;