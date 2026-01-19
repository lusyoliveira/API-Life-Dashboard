import mongoose from "mongoose";
 
const catalogoSchema = new mongoose.Schema({
    Titulo:{ type: String, 
        required: [true, "Título é obrigatório"] },
    Capa: { type: String },
    Tipo: {type: mongoose.Schema.Types.ObjectId, ref: 'tipos', required: [true, "Tipo é obrigatório"]},
    Status: {type: mongoose.Schema.Types.ObjectId, ref: 'status', required: [true, "Status é obrigatório"]},
    Onde: { type: mongoose.Schema.Types.ObjectId, ref: 'plataformas', required: [true, "Onde é obrigatório"] },
    Inicio: { type: String, required: [true, "Início é obrigatório"] },
    Fim: { type: String },
    Episodios: { type: Number, required: [true, "Episódios é obrigatório"] },
    Assistidos: { type: Number },
    Temporadas: { type: Number, required: [true, "Temporadas é obrigatório"] },
    Score: { type: Number },
    Vezes: { type: Number },
    Adicao: { type: String, required: [true, "Adição é obrigatória"] },
    Dias: { type: Number },
    Progresso: { type: Number },
}, { versionKey: false });

const catalogo = mongoose.model("catalogos", catalogoSchema);

export default catalogo;