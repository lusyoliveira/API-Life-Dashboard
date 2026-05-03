import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Transacao = sequelize.define("Transacao", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descricao: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.DATE, allowNull: false },
    categoriaId: { type: DataTypes.INTEGER, allowNull: false },
    contaOrigemId: { type: DataTypes.INTEGER, allowNull: false },
    contaDestinoId: { type: DataTypes.INTEGER, allowNull: true },
    valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    parcelaInicio: { type: DataTypes.NUMBER },
    parcelaFim: { type: DataTypes.NUMBER },
    parcelamento: { type: DataTypes.BOOLEAN },
    tipo: { type: DataTypes.STRING, allowNull: false },
    recorrente: { type: DataTypes.BOOLEAN },
    periodicidade: { type: DataTypes.STRING },
    recorrenciaInicio: { type: DataTypes.DATE },
    recorrenciaFim: { type: DataTypes.DATE },
    UltimaGeracao: { type: DataTypes.DATE },
}, { 
    tableName: "transacoes",
    timestamps: false
});

export default Transacao;