import mongoose from "mongoose";
 
const contaSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectID },
    Agencia: { type: Number },
    Conta: { type: Number },
    Banco: { type: String },
    Descricao:{ type: String },
    Tipo: { type: String },
    Saldo: { type: String }
}, { versionKey: false });

const conta = mongoose.model("conta", contaSchema);

export default conta;