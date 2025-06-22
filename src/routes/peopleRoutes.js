import express from "express";
import people from "../models/people.js"

const router = express.Router();

/**
 * @swagger
 * /people/submitPeople:
 *   post:
 *     summary: Submit a new person to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               company:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully added person
 */
router.post("/submitPeople", async (req, res)=>{
    try {
        //console.log("request body: " + req.body) #wrong
        //console.log("request body: ", req.body)  #correct way
        console.log("request body: " + JSON.stringify(req.body) );
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

/**
 * @swagger
 * /people/allPeople:
 *   get:
 *     summary: Get a list of all people
 *     ...
 */
router.get("/allPeople", async (req, res)=>{
    const data = await people.find();
    console.log(data);
    res.json(data);
})

export default router;