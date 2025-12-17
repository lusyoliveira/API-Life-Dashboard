import mongoose from "mongoose";
 
const catalogoSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectID },
    Titulo:{ type: String, required: true },
    Capa: { type: String },
    Tipo: { type: String, required: true },
    Status: { type: String, required: true },
    Onde: { type: String, required: true },
    Inicio: { type: String, required: true },
    Fim: { type: String },
    Episodios: { type: Number, required: true },
    Assistidos: { type: Number },
    Temporadas: { type: Number, required: true },
    Score: { type: Number },
    Vezes: { type: Number },
    Adicao: { type: String, required: true },
    Dias: { type: Number },
    Progresso: { type: Number },
}, { versionKey: false });

const catalogo = mongoose.model("catalogos", catalogoSchema);

export default catalogo;