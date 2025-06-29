import express from "express";
import people from "../models/people.js";
import company from "../models/company.js"

const router = express.Router();

router.get("/whoToDelete", async (req,res)=>{
    console.log("At least you hit the endpoint");
    const allPeople = await people.find();
    console.log(allPeople);
    res.render("find_delete_people", {people: allPeople});
})

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

        const specifcCompanyAmazon = await company.findOne({name:'amazon'});
        specifcCompanyAmazon.employees.push(newPerson._id);
        await specifcCompanyAmazon.save();
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
 *     
 */
router.get("/allPeople", async (req, res)=>{
    const data = await people.find();
    console.log(data);
    res.json(data);
})

/**
 * @swagger
 * /people/deletePerson/{id}:
 *   delete:
 *     summary: Delete a person by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ObjectId of the person
 *     responses:
 *       200:
 *         description: Person deleted successfully
 *       404:
 *         description: Person not found
 *       500:
 *         description: Server error
 */
router.delete("/deletePerson/:id", async(req, res)=>{
    try{
        const individualPerson = await people.findByIdAndDelete(req.params.id);  
        console.log("Im inside of here!!!");
        console.log(individualPerson);
        if (!individualPerson){
            return res.status(404).send("Person not found"); 
        }
        return res.status(200).send("It has been deleted!");
    }catch(err){
        return res.status(404).send(err)
    }
    
})

export default router;