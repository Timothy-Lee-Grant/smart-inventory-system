import mongoose from "mongoose";

peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    company: {type: mongoose.Schema.Types.ObjectId, ref: "Company"}
});

export default mongoose.model("people", peopleSchema);