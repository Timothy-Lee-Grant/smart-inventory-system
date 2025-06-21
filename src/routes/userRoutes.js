import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/submitMongo", async (req, res) => {
  try {
    console.log("request body: " + req.body)
    const newUser = new User(req.body);
    console.log(newUser.userName);
    await newUser.save();
    res.status(200).send("Data saved!");
  } catch (error) {
    console.log("inside of fail post handler /submitMongo");
    res.status(500).send("Error saving data");
  }
});

router.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    console.log(users); // Logs data to the terminal
    res.json(users); // Sends data to the frontend
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});



export default router;
