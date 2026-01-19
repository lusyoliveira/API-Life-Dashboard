import mongoose from "mongoose";
 
const transacaoSchema = new mongoose.Schema({
   
    Descricao: { type: String, required: [true, "Descrição é obrigatória"] },
    Data: { type: String, required: [true, "Data é obrigatória"] },
    Categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'categorias', required: [true, "Categoria é obrigatória"]},
    Conta: { type: String, required: [true, "Conta é obrigatória"] },
    Valor: { type: Number, required: [true, "Valor é obrigatório"] },
    ParcelaInicio: { type: Number},
    ParcelaFim: { type: Number },
    Parcelamento: { type: Boolean}
}, { versionKey: false });

const transacao = mongoose.model("transacoes", transacaoSchema);

export default transacao;