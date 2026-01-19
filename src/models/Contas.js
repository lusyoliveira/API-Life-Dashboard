import mongoose from "mongoose";
 
const contaSchema = new mongoose.Schema({
    Agencia: { type: Number, required: [true, "Agência é obrigatória"] },
    Conta: { type: Number, required: [true, "Conta é obrigatória"] },
    Banco: { type: String, required: [true, "Banco é obrigatório"] },
    Descricao:{ type: String },
    Tipo: { type: String, required: [true, "Tipo é obrigatório"] },
    Saldo: { type: String }
}, { versionKey: false });

const conta = mongoose.model("conta", contaSchema);

export default conta;