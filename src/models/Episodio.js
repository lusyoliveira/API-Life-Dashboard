import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";
 
const Episodio = sequelize.define("Episodio", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    temporadaId: {type: DataTypes.INTEGER, ref: 'catalogos', allowNull: false},
    id_tmdb_episodio: { type: DataTypes.INTEGER, allowNull: true },
    numero_epidosio: { type: DataTypes.INTEGER, allowNull: true },
    assitido:{ type: DataTypes.BOOLEAN, allowNull: false },
    titulo_epidosio: { type: DataTypes.STRING, allowNull: true },
    sinopse: { type: DataTypes.TEXT, allowNull: true },
    duracao: { type: DataTypes.STRING, allowNull: true },
    estreia: { type: DataTypes.DATE, allowNull: true },
    votos: { type: DataTypes.FLOAT, allowNull: true },
}, { 
    tableName: "episodios",
    timestamps: false
});

export default Episodio;