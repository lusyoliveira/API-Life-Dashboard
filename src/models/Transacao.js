import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Transacao = sequelize.define("Transacao", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Descrição é obrigatório" },
            notEmpty: { msg: "Descrição não pode ser enviado em branco" }
        }
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: "Data é obrigatório" },
            notEmpty: { msg: "Data não pode ser enviado em branco" }
        }
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "ID identificador da categoria é obrigatório" },
            notEmpty: { msg: "ID identificador da categoria não pode ser enviado em branco" }
        }
    },
    contaOrigemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "ID identificador da conta de origem é obrigatório" },
            notEmpty: { msg: "ID identificador da conta de origem não pode ser enviado em branco" }
        }
    },
    contaDestinoId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: { msg: "Valor é obrigatório" },
            notEmpty: { msg: "Valor não pode ser enviado em branco" }
        }
    },
    parcelaInicio: { type: DataTypes.NUMBER },
    parcelaFim: { type: DataTypes.NUMBER },
    parcelamento: { type: DataTypes.BOOLEAN },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Tipo é obrigatório" },
            notEmpty: { msg: "Tipo não pode ser enviado em branco" }
        }
    },
    recorrente: { type: DataTypes.BOOLEAN },
    periodicidade: { type: DataTypes.STRING },
    recorrenciaInicio: { type: DataTypes.DATE },
    recorrenciaFim: { type: DataTypes.DATE },
    UltimaGeracao: { type: DataTypes.DATE },
    recorrenciaId: { type: DataTypes.INTEGER },
}, {
    tableName: "transacoes",
    timestamps: false
});

export default Transacao;