import mongoose from "mongoose";
 
const plataformaSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    Tipo: { type: String, required: true }
}, { versionKey: false });

const Plataforma = mongoose.model("plataformas", plataformaSchema);

export default Plataforma;