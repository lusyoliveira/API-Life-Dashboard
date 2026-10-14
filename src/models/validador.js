import { Sequelize, DataTypes } from "sequelize";

// Configuração do hook global antes de validar qualquer modelo
Sequelize.addHook("beforeValidate", (instancia) => {
  const atributos = instancia.constructor.rawAttributes;

  for (const campo in atributos) {
    if (atributos[campo].type instanceof DataTypes.STRING) {
      const valor = instancia.getDataValue(campo);

      // Verifica se o valor é uma string vazia
      if (valor === "") {
        instancia.set(campo, null); // Força o Sequelize a disparar o erro de "notNull" se o campo for obrigatório
        
        // Ou, se preferir lançar um erro de validação customizado imediatamente:
        throw new Error(`O campo ${campo} foi fornecido em branco.`);
      }
    }
  }
});
