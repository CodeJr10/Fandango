import "dotenv/config";

import express, { Request, Response } from "express";

import cors from "cors";
import mongoose from "mongoose";

const app = express();
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from express" });
});

app.listen(7000, () => {
  console.log("server running on 7000");
});
