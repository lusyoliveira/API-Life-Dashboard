import ErroBase from "./ErroBase";

class NaoEncontrado extends ErroBase {
    constructor(mensagem = "Recurso não encontrado") {
        super(mensagem, 404);
    }
}
export default NaoEncontrado;