import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao  extends RequisicaoIncorreta {
    constructor(erro) {
        const mensagemErros = Object.values(erro.errors).map(e => e.message)
        .join("; ");
        super(`Os seguintes erros foram encontrados: ${mensagemErros}`);
    }
}
export default ErroValidacao;