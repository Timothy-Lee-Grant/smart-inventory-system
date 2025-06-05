import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/submitMongo", async (req, res) => {
  try {
    console.log("/submitMongo 1");
    const newUser = new User(req.body);
    console.log("/submitMongo 2");
    await newUser.save();
    console.log("/submitMongo 3");
    res.status(200).send("Data saved!");
  } catch (error) {
    console.log("inside of fail post handler /submitMongo");
    res.status(500).send("Error saving data");
  }
});

export default router;
