import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/v1/signup", (req: Request, res: Response) => {
    
});

app.post("/api/v1/signin", (req: Request, res: Response) => {});

app.post("/api/v1/content", (req: Request, res: Response) => {});

app.get("/api/v1/content", (req: Request, res: Response) => {});

app.delete("/api/v1/content", (req: Request, res: Response) => {});

app.post("/api/v1/brain/share", (req: Request, res: Response) => {});

app.get("/api/v1/brain/:shareLink", (req: Request, res: Response) => {});
// req.params.shareLink

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
