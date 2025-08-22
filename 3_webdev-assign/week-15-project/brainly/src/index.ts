import "express";
import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ContentModel, LinkModel, TagModel, UserModel } from "./models.js";
import { contentSchema, userAuth, userSchema } from "./middleware.js";
import { Types } from "mongoose";
import { randomHash } from "./utils.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend dev URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // <- important
    credentials: true, // optional, only if you plan to send cookies/tokens
  })
);

app.use(express.json());

// LEARN
// how to override the types of the express request object?
// type augmentation with Express Request

// jwt secret key from env
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not set in environment variables");
}

// Add some log in every endpoint for debugging

// signup endpoint (tested)
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
  const { username, password } = req.body;
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

    // create user if it doesn't exist
    await UserModel.create({
      username: username.toLowerCase(),
      password: hashedPassword,
    });

    // return the response with a message
    res.status(201).json({ message: "User signed up successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// signin endpoint (tested)
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

    // token generation
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    // return the token
    res.status(200).json({ token });
  } catch (error) {
    console.error("Signin error", error);
    res.status(500).json({ message: "Server error.", error });
  }
});

// endpoint to add content (tested: tags should be an array, and url/link should be a proper link)
app.post("/api/v1/content", userAuth, async (req: Request, res: Response) => {
  // input validation: link, type, title and tags
  console.log(req.userId);
  console.log(req.body);
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
  console.log(type, link, title, tags);

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
  console.log(tagsObject);

  // save the content (we can also add here a check if the content already exist or not?)
  await ContentModel.create({
    link,
    type,
    title,
    tags: tagsObject,
    userId: req.userId,
  });

  console.log("content added successfully");
  res.status(201).json({ message: "Content saved successfully" });
});

// endpoint to get the contents
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

// endpoint to delete a content
app.delete("/api/v1/content", userAuth, async (req: Request, res: Response) => {
  // TODO: we can also add input validation here for the contentId
  try {
    const content = await ContentModel.findOne({
      _id: req.body.contentId,
      userId: req.userId, // delete if user owns the content
    });

    if (!content) {
      return res
        .status(404)
        .json({ message: "Content not found or not owned by user." });
    }

    // while deleting the content, we can also delete the respective tags, if those tags are not used by any other contents
    await ContentModel.deleteOne({ _id: content._id });

    res.status(200).json({ message: "Content deleted successfully." });
  } catch (error) {
    console.error("Error deleting content", error);
    res.status(500).json({ message: "Server error." });
  }
});

// *****NEED TO TEST THE BELOW 2 ENDPOINTS*****
// update the share link (create or delete)
app.post(
  "/api/v1/brain/share",
  userAuth,
  async (req: Request, res: Response) => {
    const { share } = req.body; // true -> create, false -> delete
    try {
      const exist = await LinkModel.findOne({ userId: req.userId });

      if (share) {
        // CREATE LINK
        if (exist) {
          return res.status(409).json({
            message: "You already have sharable link.",
            hash: exist.hash,
          });
        }

        const hash = randomHash(10);
        await LinkModel.create({
          userId: req.userId,
          hash, // this will return a random string of length 10
        });

        return res
          .status(201)
          .json({ message: "Sharable link created successfully.", hash });
      } else {
        // DELETE LINK
        if (!exist) {
          return res
            .status(404)
            .json({ message: "You don't have any link to delete." });
        }

        await LinkModel.deleteOne({ userId: req.userId });
        res.status(201).json({ message: "Share link deleted successfully." });
      }
    } catch (error) {
      console.error(
        `error ${share ? "creating" : "deleting"} share link`,
        error
      );
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

// endpoint to fetch shared contents using a unique share link
app.get("/api/v1/brain/:shareLink", async (req: Request, res: Response) => {
  const hash = req.params.shareLink;

  try {
    const link = await LinkModel.findOne({ hash });
    if (!link) {
      return res.status(404).json({ message: "Link expired.", contents: [] });
    }

    const contents = await ContentModel.find({ userId: link.userId }).select(
      "-userId"
    );
    if (!contents) {
      return res
        .status(404)
        .json({ message: "User doesn't have any contents.", contents: [] });
    }

    res
      .status(200)
      .json({ message: "Here are the shared contents.", contents });
  } catch (error) {
    console.error("error getting contents for other users", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

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
