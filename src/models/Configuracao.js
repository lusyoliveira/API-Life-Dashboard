import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Configuracao = sequelize.define("Configuracao", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ativaMAL: { type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: { msg: "Ativa MyAnimeList é obrigatório" },
            notEmpty: { msg: "Ativa MyAnimeList não pode ser enviado em branco" }
        } 
    },
    ativaOutlook: { type: DataTypes.BOOLEAN,
        validate: {
            notNull: { msg: "Ativa outlook é obrigatório" },
            notEmpty: { msg: "Ativa outlook não pode ser enviado em branco" }
        } 
    },
    chaveOutlook: { type: DataTypes.STRING },
    ativaGoogle: { type: DataTypes.BOOLEAN,
        validate: {
            notNull: { msg: "Ativar google é obrigatório" },
            notEmpty: { msg: "Ativar google não pode ser enviado em branco" }
        } 
    },
    chaveGoogle: { type: DataTypes.STRING },
    cidade: { type: DataTypes.STRING },
    latitude: { type: DataTypes.STRING },
    longitude: { type: DataTypes.STRING },
    ativaClima: { type: DataTypes.BOOLEAN,
        validate: {
            notNull: { msg: "Ativar clima é obrigatório" },
            notEmpty: { msg: "Ativar clima não pode ser enviado em branco" }
        } 
    },
    atualizaClima: { type: DataTypes.NUMBER },
    dataContagem: { type: DataTypes.DATE },
    descricaoContagem: { type: DataTypes.STRING },
    ativaTMDB: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: { msg: "Salvar Imagem é obrigatório" },
            notEmpty: { msg: "Salvar Imagem não pode ser enviado em branco" }
        }
    },
    chaveTMDB: { type: DataTypes.STRING },
    salvarImagemCatalogo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: { msg: "Salvar Imagem é obrigatório" },
            notEmpty: { msg: "Salvar Imagem não pode ser enviado em branco" }
        }
    }
}, {
    tableName: "configuracoes",
    timestamps: false
});

export default Configuracao;