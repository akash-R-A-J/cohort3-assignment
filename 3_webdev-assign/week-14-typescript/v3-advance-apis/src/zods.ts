import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

// define schema for user profile
const userProfileSchema = z.object({
  // runtime
  name: z.string().min(3, { message: "Should contain at least 3 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "must be above 18" }).optional(),
});

// TYPE-INFERENCE : [zod.dev/?id=type-inference]
// compile-time
type UserFinalSchema = z.infer<typeof userProfileSchema>;

app.put("/user", (req, res) => {
  const { success } = userProfileSchema.safeParse(req.body);
  const updateBody: UserFinalSchema = req.body; // how to assign a type to updateBody?

  if (!success) {
    res.status(411).json({ message: "Invalid Input" });
  }

  console.log(updateBody);
  res.status(200).json({ message: "your profile have been updated." });
});
