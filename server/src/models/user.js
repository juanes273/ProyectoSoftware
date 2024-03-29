import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
},{ collection: "users" });

export default mongoose.model('User', userSchema)
