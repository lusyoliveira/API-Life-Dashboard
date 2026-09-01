import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Catalogo = sequelize.define("Catalogo", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo:{ type: DataTypes.STRING, allowNull: false },
    capa: { type: DataTypes.STRING, allowNull: true },
    tipoId: {type: DataTypes.STRING, allowNull: false },
    statusId: {type: DataTypes.STRING, ref: 'status', allowNull: false},
    plataformaId: { type: DataTypes.STRING, ref: 'plataformas', allowNull: false },
    inicio: { type: DataTypes.DATE, allowNull: true },
    fim: { type: DataTypes.DATE, allowNull: true },
    episodios: { type: DataTypes.INTEGER, allowNull: false },
    assistidos: { type: DataTypes.INTEGER, allowNull: true },
    temporadas: { type: DataTypes.INTEGER, allowNull: false },
    score: { type: DataTypes.FLOAT, allowNull: true },
    vezes: { type: DataTypes.INTEGER, allowNull: true },
    adicao: { type: DataTypes.DATE, allowNull: false },
    dias: { type: DataTypes.INTEGER, allowNull: true },
    progresso: { type: DataTypes.INTEGER, allowNull: true },
    id_tmdb: { type: DataTypes.INTEGER, allowNull: true },
    original_name: { type: DataTypes.STRING, allowNull: true },
    overview: { type: DataTypes.TEXT, allowNull: true },
    poster_path: { type: DataTypes.BLOB, allowNull: true },
    media_type: { type: DataTypes.STRING, allowNull: true },
    genres_ids: { type: DataTypes.JSON, allowNull: true },
    popularity: { type: DataTypes.FLOAT, allowNull: true },
    first_air_date: { type: DataTypes.DATE, allowNull: true },
    year: { type: DataTypes.INTEGER, allowNull: true },
    vote_average: { type: DataTypes.FLOAT, allowNull: true },
}, { 
    tableName: "catalogos",
    timestamps: false
});

export default Catalogo;