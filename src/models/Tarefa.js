import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Tarefa = sequelize.define("Tarefa", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tarefa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Tarefa é obrigatório" },
            notEmpty: { msg: "Tarefa não pode ser enviado em branco" }
        }
    },
    adicionado: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: "Data de Adição é obrigatório" },
            notEmpty: { msg: "Data de Adição não pode ser enviado em branco" }
        }
    },
    feito: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: { msg: "Feito é obrigatório" },
            notEmpty: { msg: "Feito não pode ser enviado em branco" }
        }
    }
}, {
    tableName: "tarefas",
    timestamps: false
});

export default Tarefa;