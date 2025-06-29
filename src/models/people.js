import mongoose from "mongoose";












const peopleSchema = new mongoose.Schema({
    personName: String,
    personAge: Number,
    personCompany: {type: mongoose.Schema.Types.ObjectId, ref: "Company"}
});

export default mongoose.model("people", peopleSchema);