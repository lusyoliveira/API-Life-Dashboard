import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Catalogo = sequelize.define("Catalogo", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo:{ 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
        notNull: { msg: "Título é obrigatório" },
        notEmpty: { msg: "Título não pode ser enviado em branco" } 
        }
    },
    capa: { type: DataTypes.STRING, allowNull: true },
    tipoId: {type: DataTypes.INTEGER, allowNull: false,
        validate: {
        notNull: { msg: "Tipo é obrigatório" },
        notEmpty: { msg: "Tipo não pode ser enviado em branco" } 
        }
    },
    statusId: {type: DataTypes.INTEGER, ref: 'status', allowNull: false,
        validate: {
        notNull: { msg: "Status é obrigatório" },
        notEmpty: { msg: "Status não pode ser enviado em branco" } 
        }
    },
    plataformaId: { type: DataTypes.INTEGER, ref: 'plataformas', allowNull: false,
        validate: {
        notNull: { msg: "Plataforma é obrigatório" },
        notEmpty: { msg: "Plataforma não pode ser enviado em branco" } 
        }
    },
    inicio: { type: DataTypes.DATE, allowNull: true },
    fim: { type: DataTypes.DATE, allowNull: true },
    episodios: { type: DataTypes.INTEGER, allowNull: false,
        validate: {
        notNull: { msg: "Episódios é obrigatório" },
        notEmpty: { msg: "Episódios não pode ser enviado em branco" } 
        }
    },
    assistidos: { type: DataTypes.INTEGER, allowNull: true },
    temporadas: { type: DataTypes.INTEGER, allowNull: false,
        validate: {
        notNull: { msg: "Temporadas é obrigatório" },
        notEmpty: { msg: "Temporadas não pode ser enviado em branco" } 
        }
    },
    score: { type: DataTypes.FLOAT, allowNull: true },
    vezes: { type: DataTypes.INTEGER, allowNull: true },
    adicao: { type: DataTypes.DATE, allowNull: false,
        validate: {
        notNull: { msg: "Data de adição é obrigatório" },
        notEmpty: { msg: "Data de adição não pode ser enviado em branco" } 
        }
    },
    dias: { type: DataTypes.INTEGER, allowNull: true },
    progresso: { type: DataTypes.INTEGER, allowNull: true },
    id_tmdb: { type: DataTypes.INTEGER, allowNull: true },
    original_name: { type: DataTypes.STRING, allowNull: true },
    overview: { type: DataTypes.TEXT, allowNull: true },
    poster_path: { type: DataTypes.BLOB, allowNull: true },
    popularity: { type: DataTypes.FLOAT, allowNull: true },
    first_air_date: { type: DataTypes.DATE, allowNull: true },
    year: { type: DataTypes.INTEGER, allowNull: true },
    vote_average: { type: DataTypes.FLOAT, allowNull: true },
}, { 
    tableName: "catalogos",
    timestamps: false
});

export default Catalogo;