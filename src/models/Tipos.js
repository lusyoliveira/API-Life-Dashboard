import mongoose from "mongoose";
 
const tipoSchema = new mongoose.Schema({
    descricao: { type: String, required: [true, "Descrição do tipo é obrigatória"] },
    Tipo: { type: String, required: [true, "Tipo do tipo é obrigatório"] }
}, { versionKey: false });

const Tipo = mongoose.model("tipos", tipoSchema);

export default Tipo;