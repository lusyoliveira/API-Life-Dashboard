import mongoose from "mongoose";
 
const agendacategoriaSchema = new mongoose.Schema({
    descricao: { type: String, required: true }
}, { versionKey: false });

const agendaCategoria = mongoose.model("agendacategorias", agendacategoriaSchema);

export default agendaCategoria;