import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/submitMongo", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    console.log("inside of post handler /submitMongo");
    res.send("Data saved!");
  } catch (error) {
    console.log("inside of fail post handler /submitMongo");
    res.status(500).send("Error saving data");
  }
});

export default router;
