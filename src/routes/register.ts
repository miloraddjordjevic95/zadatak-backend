const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
import { Request, Response } from "express";

router.post("/", async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: "Internal server error." });
    }
  }
});

module.exports = router;
