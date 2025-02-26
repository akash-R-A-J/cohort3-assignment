const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { z } = require("zod");
const { UserModel, TodoModel } = require("./db");
const JWT_SECRET = "iuenuygewwbiwaudhi7ur";
const SALT_ROUND = 10;

// database credentials = cluster credentials + database name
// connect is an async functionn
mongoose.connect(
  "mongodb+srv://rajakash3852:ROx9kJAmHYYOJGTa@cluster0.2wkzs.mongodb.net/todo-app-database"
);
const app = express();
app.use(express.json());

function auth(req, res, next) {
  try {
    const token = req.headers.token;
    const userId = JWT.verify(token, JWT_SECRET).userId;
    req.userId = new mongoose.Types.ObjectId(userId);
    next();
  } catch (e) {
    // if err, block the request
    return res.status(403).json({ msg: "Invalid token" });
  }
}

// middleware for input validation
function inputValidation(req, res, next) {
  // creating a zod object / schema
  const requiredBody = z.object({
    email: z.string().min(5).max(30).email(),
    name: z.string().min(3).max(50),
    password: z.string().min(6).max(15),
  });

  //  only returns data or throw an error if not parsed
  // const parsedData = requiredBody.parse(req.body);

  //  returns an object with different fields (e.g.: success, error, data etc..);
  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res
      .status(403)
      .json({ msg: "Incorrect format", error: parsedDataWithSuccess.error });
    return;
  }

  next();
}

app.post("/signup", inputValidation, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  try {
    // this is an asynchronous function, so we have to await this
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

    await UserModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });
  } catch (e) {
    console.log("error", e);
    return res
      .status(400)
      .json({ msg: "You have already signed-up, try signin-in.", error: e });
  }

  console.log("You are signed up!");
  res.status(200).json({ msg: "You are signed up!" });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //   we have to awiat all database calls
  const user = await UserModel.findOne({
    email: email,
  });

  if (!user) {
    return res.status(403).json({ msg: "User not found, try signing-up!" });
  }

  const userMatch = bcrypt.compare(password, user.password);
  console.log(user); // for debugging

  if (userMatch) {
    // token is signed using userid (unique identifier for users) : user._id
    const token = JWT.sign({ id: user._id }, JWT_SECRET);
    return res
      .status(200)
      .header({ token: token })
      .json({ msg: "You are logged in!" });
  }

  res.status(403).json({ msg: "wrong email or password." });
});

app.post("/todo", auth, async (req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const token = req.headers.token;

  try {
    await TodoModel.create({
      title: title,
      done: false,
      userId: userId,
    });
  } catch (e) {
    return res.status(403).json({ msg: "error inserting to-do" });
  }

  res
    .status(200)
    .header({ token: token })
    .json({ msg: "Added to-do successfully." });
});

app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;

  try {
    const todo = await TodoModel.find({
      userId: userId,
    });

    console.log(todo);

    if (todo) {
      return res.status(200).json({ todo: todo });
    } else {
      return res.status(403).json({ msg: "No to-dos found, try adding one." });
    }
  } catch (e) {
    return res.status(403).json({ msg: "error in finding todos.", error: e });
  }
});

app.listen(3000);
