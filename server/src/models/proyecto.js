import mongoose from "mongoose";

//Schema
const schema = mongoose.Schema({
    title: String,
    content: String,
    owner: String,
    ownerId: mongoose.Types.ObjectId
})


export default mongoose.model('Notas', schema)