import mongoose from "mongoose";
 
const contaSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectID },
    Agencia: { type: Number, required: true },
    Conta: { type: Number, required: true },
    Banco: { type: String, required: true },
    Descricao:{ type: String },
    Tipo: { type: String, required: true },
    Saldo: { type: String }
}, { versionKey: false });

const conta = mongoose.model("conta", contaSchema);

export default conta;