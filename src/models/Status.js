import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Status = sequelize.define("Status", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descricao: { 
    type: DataTypes.STRING, 
    allowNull: false,
        validate: {
        notNull: { msg: "Descrição é obrigatório" },
        notEmpty: { msg: "Descrição não pode ser enviado em branco" } 
        }
    },
  tipo: { type: DataTypes.STRING, allowNull: false,
        validate: {
        notNull: { msg: "Tipo é obrigatório" },
        notEmpty: { msg: "Tipo não pode ser enviado em branco" } 
        }
    }
}, {
  tableName: "status",
  timestamps: false
});

export default Status;