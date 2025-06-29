import mongoose from "mongoose";











const companySchema = new mongoose.Schema({
    name: String,
    industry: String,
    marketCap: Number,
    employees: [{type: mongoose.Schema.Types.ObjectId, ref: "people"}]
});

export default mongoose.model("Company", companySchema);


