import mongoose from "mongoose";
 
const cursosareasSchema = new mongoose.Schema({
    descricao: { type: String, required: true }
}, { versionKey: false });

const cursosAreas = mongoose.model("cursosareas", cursosareasSchema);

export default cursosAreas;