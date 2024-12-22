import "dotenv/config";

import express, { Request, Response } from "express";

import authRoutes from "./routes/auth";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/users";

const app = express();
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7000, () => {
  console.log("server running on 7000");
});
