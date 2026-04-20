import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Cursos = sequelize.define("Curso", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    capa: { type: DataTypes.STRING },
    descricao: { type: DataTypes.STRING, allowNull: false },
    plataformaId: { type: DataTypes.INTEGER, allowNull: false },
    aulas: { type: DataTypes.NUMBER, allowNull: false },
    assistido: { type: DataTypes.NUMBER },
    horas: { type: DataTypes.NUMBER },
    professor:{ type: DataTypes.STRING, allowNull: false },
    areaId: { type: DataTypes.INTEGER, allowNull: false },
    comprado: { type: DataTypes.DATE },
    valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    statusId: {type: DataTypes.INTEGER, allowNull: false},
    certificado: { type: DataTypes.BOOLEAN },
    progresso: { type: DataTypes.NUMBER }
}, { 
    tableName: "cursos",
    timestamps: false
});

export default Cursos;