import express from "express";
import company from "../models/company.js"

const router = express.Router();







router.get("/", async (req,res)=>{
    const allCompanies = await company.find();
    res.render('people_company_address', {allCompanies:allCompanies});
});

export default router;