import mongoose from "mongoose";
 
const transacaoSchema = new mongoose.Schema({
   
    Descricao: { type: String, required: true },
    Data: { type: String, required: true },
    Categoria: { type: String, required: true },
    Conta: { type: String, required: true },
    Valor: { type: Number, required: true },
    ParcelaInicio: { type: Number},
    ParcelaFim: { type: Number },
    Parcelamento: { type: Boolean}
}, { versionKey: false });

const transacao = mongoose.model("transacoes", transacaoSchema);

export default transacao;