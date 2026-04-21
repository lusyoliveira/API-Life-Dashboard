import mongoose from "mongoose";
 
const statusSchema = new mongoose.Schema({
    descricao: { type: String, required: [true, "Descrição do status é obrigatória"] },
    Tipo: { type: String, required: [true, "Tipo do status é obrigatório"] }
}, { versionKey: false });

const status = mongoose.model("status", statusSchema);

export default status;