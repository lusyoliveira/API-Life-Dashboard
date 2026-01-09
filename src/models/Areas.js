import mongoose from "mongoose";
 
const areasSchema = new mongoose.Schema({
    descricao: { type: String, required: true }
}, { versionKey: false });

const Areas = mongoose.model("areas", areasSchema);

export default Areas;