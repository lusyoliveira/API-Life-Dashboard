import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Temporada = sequelize.define("Temporada", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tituloId: {type: DataTypes.INTEGER, ref: 'catalogos', allowNull: false},
    id_tmdb_temporada: { type: DataTypes.INTEGER, allowNull: true },
    numero_temporada: { type: DataTypes.INTEGER, allowNull: true },
    nome_temporada: { type: DataTypes.STRING, allowNull: true },
    sinopse: { type: DataTypes.TEXT, allowNull: true },
    estreia: { type: DataTypes.DATE, allowNull: true },
    poster: { type: DataTypes.BLOB, allowNull: true },
    votos: { type: DataTypes.FLOAT, allowNull: true },
    quantidade_episodios: { type: DataTypes.INTEGER, allowNull: true },
}, { 
    tableName: "temporadas",
    timestamps: false
});

export default Temporada;