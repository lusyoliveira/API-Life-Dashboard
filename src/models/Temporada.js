import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Temporada = sequelize.define("Temporada", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tituloId: {type: DataTypes.STRING, ref: 'catalogo', allowNull: false},
    temporada: { type: DataTypes.INTEGER, allowNull: true },
    nomeTemporada: { type: DataTypes.STRING, allowNull: true },
    plataformaExibicao: { type: DataTypes.STRING, allowNull: true },
    sinopse: { type: DataTypes.TEXT, allowNull: true },
    exibicao: { type: DataTypes.DATE, allowNull: true },
    id_tmdb_temporada: { type: DataTypes.INTEGER, allowNull: true },
    posterTemporada: { type: DataTypes.BLOB, allowNull: true },
    mediaVotosTemporada: { type: DataTypes.FLOAT, allowNull: true },
    numeroEpisodio: { type: DataTypes.INTEGER, allowNull: true },
    tituloEpisodio: { type: DataTypes.STRING, allowNull: true },
    mediaVotosEpisodio: { type: DataTypes.FLOAT, allowNull: true },
}, { 
    tableName: "temporadas",
    timestamps: false
});

export default Temporada;