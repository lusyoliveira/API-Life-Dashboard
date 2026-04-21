import mongoose from "mongoose";
 
const configuracaoSchema = new mongoose.Schema({
    AtivaMAL: { type: Boolean },
    AtivaOutlook: { type: Boolean },
    ChaveOutlook: { type: String },
    AtivaGoogle:{ type: Boolean },
    ChaveGoogle: { type: String },
    Cidade: { type: String },
    Latitude: { type: String },
    Longitude: { type: String },
    AtivaClima: { type: Boolean },
    AtualizaClima: { type: Number },
    DataContagem: { type: String },
    DescricaoContagem: { type: String }
}, { versionKey: false });

const configuracao = mongoose.model("configuracoes", configuracaoSchema);

export default configuracao;