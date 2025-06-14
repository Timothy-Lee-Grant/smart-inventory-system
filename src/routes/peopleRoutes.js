import express from "express";
import people from "../models/people.js"

const router = express.Router();

router.post("/submitPeople", async (req, res)=>{
    try {
        const newPerson = new people(req.body);
        await newPerson.save();
        res.send("got it");
    }
    catch(error){
        console.log(error);
        res.status(500).send("There was an error.");
    }


    //console.log(req.body);
    //console.log("can you hear me?");
    //console.log(req.body.personAge);
    //res.send("got it");
});

router.get("/allPeople", async (req, res)=>{
    const data = await people.find();
    console.log(data);
    res.json(data);
})

export default router;