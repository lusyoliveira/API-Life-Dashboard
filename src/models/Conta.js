import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Contas = sequelize.define("Conta", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    agencia: { type: DataTypes.NUMBER, allowNull: false },
    conta: { type: DataTypes.NUMBER, allowNull: false },
    banco: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING },
    tipo: { type: DataTypes.STRING, allowNull: false },
    saldo: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { 
    tableName: "contas",
    timestamps: false
});

export default Contas;