import { ValidationError, DatabaseError } from "sequelize";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
function ManipularErros(erro, req, res, next) {         
    // Trata erros de validação do Sequelize (ex: restrições de modelo, campos obrigatórios)
    if (erro instanceof ValidationError) {
        new ErroValidacao(erro).enviarResposta(res);
    } 
    // Trata erros de banco de dados (ex: erro de sintaxe ou conversão de tipo/ID inválido no SQLite)
    else if (erro instanceof DatabaseError) {
        new RequisicaoIncorreta().enviarResposta(res);
    } 
    // Trata os seus erros customizados baseados na classe ErroBase
    else if (erro instanceof ErroBase) {
        erro.enviarResposta(res);
    } 
    // Erro interno do servidor genérico
    else {
        new ErroBase().enviarResposta(res);
    }
};

export default ManipularErros;
