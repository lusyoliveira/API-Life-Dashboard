import mongoose from "mongoose";
 
const agendatipoSchema = new mongoose.Schema({
    descricao: { type: String, required: true }
}, { versionKey: false });

const agendaTipo = mongoose.model("agendaTipos", agendatipoSchema);

export default agendaTipo;