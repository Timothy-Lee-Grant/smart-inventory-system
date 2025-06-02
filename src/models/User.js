import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  message: String,
});

export default mongoose.model("User", userSchema);
