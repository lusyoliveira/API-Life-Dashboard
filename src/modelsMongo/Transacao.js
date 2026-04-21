import mongoose from "mongoose";
 
const transacaoSchema = new mongoose.Schema({
   
    Descricao: { type: String, required: [true, "Descrição é obrigatória"] },
    Data: { type: String, required: [true, "Data é obrigatória"] },
    Categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'categorias'},
    ContaOrigem: { type:  mongoose.Schema.Types.ObjectId, ref: 'conta', required: [true, "Conta origem é obrigatória"] },
    ContaDestino: { type:  mongoose.Schema.Types.ObjectId, ref: 'conta' },
    Valor: { type: Number, required: [true, "Valor é obrigatório"] },
    ParcelaInicio: { type: Number},
    ParcelaFim: { type: Number },
    Parcelamento: { type: Boolean},
    Tipo: {type: String, required: [true, "Tipo é obrigatório"] },
    Recorrente: { type: Boolean },
    Periodicidade: { type: String },
    RecorrenciaInicio: { type: String },
    RecorrenciaFim: { type: String },
    UltimaGeracao: { type: String },
}, { versionKey: false });

const transacao = mongoose.model("transacoes", transacaoSchema);

export default transacao;