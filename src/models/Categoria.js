import mongoose from "mongoose";
 
const categoriaSchema = new mongoose.Schema({
    descricao: { type: String, required: [true, "Descrição da categoria é obrigatória"] },
    Tipo: { type: String, required: [true, "Tipo da categoria é obrigatório"] }
}, { versionKey: false });

const Categoria = mongoose.model("categorias", categoriaSchema);

export default Categoria;