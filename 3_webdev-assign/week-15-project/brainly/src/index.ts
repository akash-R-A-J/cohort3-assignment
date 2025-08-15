import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ContentModel, TagModel, UserModel } from "./models.js";
import { contentSchema, userAuth, userSchema } from "./middleware.js";
import { Types } from "mongoose";
// import type { AuthenticatedRequest } from "./utils.js";

dotenv.config();

const app = express();
app.use(express.json());

// jwt secret key from env
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not set in environment variables");
}

// just for checking/debugging
console.log(process.env.MONGO_URL);
console.log(process.env.PORT);
console.log(process.env.JWT_SECRET_KEY);

// signup endpoint
app.post("/api/v1/signup", async (req: Request, res: Response) => {
  // zod validation
  const parsedBody = userSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      errors: parsedBody.error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    });
  }

  // password hashing
  const { username, password } = parsedBody.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // try-catch
  try {
    // check if user already exist or not, send status code 409 if exist already
    const existingUser = await UserModel.findOne({
      username: username.toLowerCase(),
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists, try signing in." });
    }

    await UserModel.create({
      username: username.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({ message: "User signed up successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// signin endpoint
app.post("/api/v1/signin", async (req: Request, res: Response) => {
  // zod validation
  const parsedBody = userSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      errors: parsedBody.error.issues.map((err) => ({
        error: err.path.join("."),
        message: err.message,
      })),
    });
  }

  // username and password check
  const { username, password } = parsedBody.data;

  try {
    const existingUser = await UserModel.findOne({
      username: username.toLowerCase(),
    });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedPassword) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // token creation
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Signin error", error);
    res.status(500).json({ message: "Server error.", error });
  }
});

// TODO: Write other models, schema and implement the endpoints

// how to override the types of the express request object?

// endpoint to add content
app.post("/api/v1/content", userAuth, async (req: Request, res: Response) => {
  // input validation: link, type, title and tags
  const parsedBody = contentSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      errors: parsedBody.error.issues.map((err) => ({
        error: err.path.join("."),
        message: err.message,
      })),
    });
  }

  const { type, link, title, tags } = parsedBody.data;

  // check if tags already exist or not? if exist, create an array with the respective tag objectId
  let tagsObject: Types.ObjectId[] = [];
  if (tags) {
    tagsObject = await Promise.all(
      tags.map(async (tag) => {
        let t = await TagModel.findOne({ title: tag });

        // create tag if it doesn't exist
        if (!t) {
          t = await TagModel.create({
            title: tag,
          });
        }

        return t._id;
      })
    );
  }

  // save the content (we can also add here a check if the content already exist or not?)
  await ContentModel.create({
    link,
    type,
    title,
    tags: tagsObject,
    userId: req.userId,
  });

  res.status(201).json({ message: "Content saved successfully" });
});

app.get("/api/v1/content", userAuth, async (req: Request, res: Response) => {
  try {
    const contents = await ContentModel.find({
      userId: req.userId,
    });

    if (!contents.length) {
      return res
        .status(200)
        .json({ contents: [], message: "No content found, try adding some." });
    }

    res.status(200).json({ contents });
  } catch (error) {
    console.error("Error fetching content", error);
    res.status(500).json({ message: "Server error." });
  }
});

app.delete("/api/v1/content", (req: Request, res: Response) => {});

app.post("/api/v1/brain/share", (req: Request, res: Response) => {});

app.get("/api/v1/brain/:shareLink", (req: Request, res: Response) => {});
// req.params.shareLink

// checking if MONGO_URL exist or not
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error("MONGO_URL is not defined in environment variables.");
}

// function to connect to mongodb and start the server on the given port
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL as string);
    console.log("connected to MongoDB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`App is listening on PORT: ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to MongoDB.", error);
    process.exit(1);
  }
};

startServer();
