import { z } from "zod";
import dotenv from "dotenv";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
// import type { AuthenticatedRequest } from "./utils.js";

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

// INPUT VALIDATION
// 1. USER
// input validation for signup and signin (username and password)
const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })
  .max(30, { message: "Password must not exceed 30 characters" })
  .regex(/[A-Z]/, { message: "Include at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Include at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Include at least one digit" })
  .regex(/[^A-Za-z0-9]/, { message: "Include at least one symbol" })
  .regex(/^\S+$/, { message: "Password must not contain spaces or tabs" });

/*   or we can just use this:
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
            { message: "Password must contain uppercase, lowercase, digit, symbol, and no spaces" }
        );    
  
*/

export const userSchema = z.object({
  username: z.string().min(3).max(50),
  password: passwordSchema,
});

// 2. CONTENT (Input Validation) : [link, types, title, tags]
export const contentSchema = z.object({
  type: z.string().trim().min(1, { message: "Type is required." }).max(50),
  link: z
    .string()
    .trim()
    .min(3, { message: "Link is required." })
    .max(100)
    .url({ message: "Link must be a valid url." }),
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required." })
    .max(100, { message: "must be less than 100 characters." }),
  tags: z
    .array(
      z
        .string()
        .trim()
        .min(3)
        .max(150, { message: "must be less than 150 characters." })
    )
    .optional(),
});

// AUTHENTICATION

// middleware for authentication
export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  // .check if token is present or not?
  // expects token as something like this: [token: "bearer token_value"]
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Invalid token." });
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    if (!decoded.id) {
      return res.status(403).json({ message: "Invalid token payload." });
    }

    // store the id in req object for future use
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Invalid token", error);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
