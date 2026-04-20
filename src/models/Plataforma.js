import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Plataforma = sequelize.define("Plataforma", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descricao: { type: DataTypes.STRING, allowNull: false },
    tipo: { type: DataTypes.STRING, allowNull: false }
}, { 
    tableName: "plataformas",
    timestamps: false
});

export default Plataforma;