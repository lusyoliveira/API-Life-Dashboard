import mongoose from "mongoose";
 
const tipoSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    Tipo: { type: String, required: true }
}, { versionKey: false });

const Tipo = mongoose.model("tipos", tipoSchema);

export default Tipo;