import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Contas = sequelize.define("Conta", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    agencia: { 
        type: DataTypes.NUMBER, 
        allowNull: false,
    validate: {
      notNull: { msg: "Agência é obrigatório" },
      notEmpty: { msg: "Agência não pode ser enviado em branco" } 
        }
    },
    conta: { 
        type: DataTypes.NUMBER, 
        allowNull: false,
    validate: {
      notNull: { msg: "Conta é obrigatório" },
      notEmpty: { msg: "Conta não pode ser enviado em branco" } 
        }
    },
    banco: { 
        type: DataTypes.STRING, 
        allowNull: false },
    descricao: { type: DataTypes.STRING },
    tipo: { 
        type: DataTypes.STRING, 
        allowNull: false,
    validate: {
      notNull: { msg: "Tipo é obrigatório" },
      notEmpty: { msg: "Tipo não pode ser enviado em branco" } 
        }
    },
    saldo: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
    validate: {
      notNull: { msg: "saldo é obrigatório" },
      notEmpty: { msg: "saldo não pode ser enviado em branco" } 
        }
    }
}, { 
    tableName: "contas",
    timestamps: false
});

export default Contas;