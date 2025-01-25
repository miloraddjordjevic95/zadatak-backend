import { NextFunction, Request, Response } from "express";
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
