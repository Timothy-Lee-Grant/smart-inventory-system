import express from "express";
import company from "../models/company.js"

//{ name: 'amazon', marketCap: '53' }
//new ObjectId('686099f3602666ecf2657a4b')

const router = express.Router();

router.delete('/deleteCompany/:id', async (req,res)=>{
    try{
        const something = await company.findByIdAndDelete(req.params.id);
        if(!something){
            console.log("something happened, not something");
        }
        else{
            console.log("inside the else statement");
            console.log(req.params.id);
        }
        //console.log(something);
        res.send(200);
    }
    catch(err){
        console.log("insie the catch 4457");
        res.status(404).send(err);
    }
    
});

router.get('/allCompanyInfo', async(req,res)=>{
    const allCompaniesInfo = await company.find();
    res.status(200).json(allCompaniesInfo);
})

router.get('/findCompany', async (req,res)=>{
    const listOfCompanies = await company.find();
    res.render("find_delete_company", {companies:listOfCompanies})
})
router.post('/submitCompany', async (req, res)=>{
    console.log(req.body);
    const newCompany = new company(req.body);
    await newCompany.save();
    console.log(newCompany._id);
    console.log("aeowrqwn");
    
})

export default router;