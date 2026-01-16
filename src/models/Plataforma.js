import mongoose from "mongoose";
 
const plataformaSchema = new mongoose.Schema({
    descricao: { type: String, required: [true, "Descrição da plataforma é obrigatória"] },
    Tipo: { type: String, required: [true, "Tipo da plataforma é obrigatório"] }
}, { versionKey: false });

const Plataforma = mongoose.model("plataformas", plataformaSchema);

export default Plataforma;