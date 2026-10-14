import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Episodio = sequelize.define("Episodio", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    temporadaId: {
        type: DataTypes.INTEGER,
        ref: 'temporadas',
        allowNull: false,
        validate: {
            notNull: { msg: "ID identificador da temporada é obrigatório" },
            notEmpty: { msg: "ID identificador da temporada não pode ser enviado em branco" }
        }
    },
    id_tmdb_episodio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "ID do TMDB é obrigatório" },
            notEmpty: { msg: "ID do TMDB não pode ser enviado em branco" }
        }
    },
    numero_episodio: { type: DataTypes.INTEGER, allowNull: true },
    assistido: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: { msg: "Assistido é obrigatório" },
            notEmpty: { msg: "Assistido não pode ser enviado em branco" }
        }
    },
    titulo_episodio: { type: DataTypes.STRING, allowNull: true },
    sinopse: { type: DataTypes.TEXT, allowNull: true },
    duracao: { type: DataTypes.STRING, allowNull: true },
    estreia: { type: DataTypes.DATE, allowNull: true },
    votos: { type: DataTypes.FLOAT, allowNull: true },
}, {
    tableName: "episodios",
    timestamps: false
});

export default Episodio;