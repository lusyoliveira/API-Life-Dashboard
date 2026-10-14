import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Agenda = sequelize.define("Agenda", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Título é obrigatório" },
      notEmpty: { msg: "Título não pode ser enviado em branco" }
    }
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: { msg: "Data é obrigatória" },
      notEmpty: { msg: "Data não pode ser enviado em branco" }
    }
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "ID identificador da categoria é obrigatória" },
      notEmpty: { msg: "Data não pode ser enviado em branco" }
    }
  },
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "ID identificador do status é obrigatório" },
      notEmpty: { msg: "Data não pode ser enviado em branco" }
    }
  },
  tipoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "ID identificador do tipo é obrigatório" },
      notEmpty: { msg: "Data não pode ser enviado em branco" }
    }
  },
  recorrente: {
    type: DataTypes.BOOLEAN
  },
  periodicidade: {
    type: DataTypes.STRING
  }
}, {
  tableName: "agendas",
  timestamps: false
});

export default Agenda;
