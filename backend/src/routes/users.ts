import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";

import User from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/register",
  [
    body("firstName", "First Name is required").isString(),
    body("lastName", "Last Name is required").isString(),
    body("email", "Email is required").isEmail(),
    body("password", "Password of minimum 6 characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.sendStatus(200);
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
