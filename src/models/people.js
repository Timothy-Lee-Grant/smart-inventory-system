import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
    peopleName: String,
    peopleAge: Number,
    peopleCompany: {type: mongoose.Schema.Types.ObjectId, ref: "Company"}
});

export default mongoose.model("people", peopleSchema);