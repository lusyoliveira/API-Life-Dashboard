import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function ManipularErros(erro, req, res, next) {         
    if (erro instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Dado incorretos"});
    } else {
        res.status(500).json({ message: 'Erro Interno do Servidor.'});
    }
}

export default ManipularErros;