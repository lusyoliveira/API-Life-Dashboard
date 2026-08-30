import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Configuracao = sequelize.define("Configuracao", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ativaMAL: { type: DataTypes.BOOLEAN },
    ativaOutlook: { type: DataTypes.BOOLEAN },
    chaveOutlook: { type: DataTypes.STRING },
    ativaGoogle:{ type: DataTypes.BOOLEAN },
    chaveGoogle: { type: DataTypes.STRING },
    cidade: { type: DataTypes.STRING },
    latitude: { type: DataTypes.STRING },
    longitude: { type: DataTypes.STRING },
    ativaClima: { type: DataTypes.BOOLEAN },
    atualizaClima: { type: DataTypes.NUMBER },
    dataContagem: { type: DataTypes.DATE },
    descricaoContagem: { type: DataTypes.STRING },
    ativaTMDB: { type: DataTypes.BOOLEAN },
    chaveTMDB: { type: DataTypes.STRING },
}, { 
    tableName: "configuracoes",
    timestamps: false
 });

export default Configuracao;