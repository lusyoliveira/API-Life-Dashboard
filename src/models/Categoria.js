import mongoose from "mongoose";
 
const categoriaSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    Tipo: { type: String, required: true }
}, { versionKey: false });

const Categoria = mongoose.model("categorias", categoriaSchema);

export default Categoria;