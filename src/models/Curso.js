import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Cursos = sequelize.define("Curso", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    capa: { type: DataTypes.STRING },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Descrição é obrigatório" },
            notEmpty: { msg: "Descrição não pode ser enviado em branco" }
        }
    },
    plataformaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "ID identificador da plataforma é obrigatório" },
            notEmpty: { msg: "ID identificador da plataforma não pode ser enviado em branco" }
        }
    },
    aulas: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
            notNull: { msg: "Aulas é obrigatório" },
            notEmpty: { msg: "Aulas não pode ser enviado em branco" }
        }
    },
    assistido: { type: DataTypes.NUMBER },
    horas: { type: DataTypes.NUMBER },
    professor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Professor é obrigatório" },
            notEmpty: { msg: "Professor não pode ser enviado em branco" }
        }
    },
    areaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "ID identificador da área é obrigatório" },
            notEmpty: { msg: "ID identificador da área não pode ser enviado em branco" }
        }
    },
    comprado: { type: DataTypes.DATE },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: { msg: "Valor é obrigatório" },
            notEmpty: { msg: "Valor não pode ser enviado em branco" }
        }
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "ID identificador do status é obrigatório" },
            notEmpty: { msg: "ID identificador do status não pode ser enviado em branco" }
        }
    },
    certificado: { type: DataTypes.BOOLEAN },
    progresso: { type: DataTypes.NUMBER }
}, {
    tableName: "cursos",
    timestamps: false
});

export default Cursos;