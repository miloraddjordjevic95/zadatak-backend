import { Request, Response } from "express";
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const registerRoute = require("./src/routes/register");
const loginRoute = require("./src/routes/login");

dotenv.config();
mongoose.connect(process.env.MONGODB_URI!);

const app = express();
const PORT = process.env.PORT! || 3001;

app.use(express.json());
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is running and ready to handle requests!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
