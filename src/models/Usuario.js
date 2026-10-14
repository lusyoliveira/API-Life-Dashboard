import { DataTypes } from "sequelize";
import sequelize from "../config/dbConexao.js";

const Usuario = sequelize.define("Usuario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Login é obrigatório" },
      notEmpty: { msg: "Login não pode ser enviado em branco" }
    }
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Nome é obrigatório" },
      notEmpty: { msg: "Nome não pode ser enviado em branco" }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Email é obrigatório" },
      notEmpty: { msg: "Email não pode ser enviado em branco" }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Senha é obrigatório" },
      notEmpty: { msg: "Senha não pode ser enviado em branco" }
    }
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      notNull: { msg: "Assistido é obrigatório" },
      notEmpty: { msg: "Assistido não pode ser enviado em branco" }
    }
  },
  cadastro: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: { msg: "Data de cadastro é obrigatória" },
      notEmpty: { msg: "Data de cadastro não pode ser enviado em branco" }
    }
  },
  alteracao: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: { msg: "Data de alteração é obrigatória" },
      notEmpty: { msg: "Data de alteração não pode ser enviado em branco" }
    }
  }
}, {
  tableName: "usuarios",
  timestamps: false
});

export default Usuario;