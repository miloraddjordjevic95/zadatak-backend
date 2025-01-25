const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const router = express.Router();
import { Request, Response } from "express";

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );
    res.status(200).json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: "Internal server error." });
    }
  }
});

module.exports = router;
