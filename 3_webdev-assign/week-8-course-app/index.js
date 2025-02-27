require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { z } = require("zod");
const { UserModel, CourseModel } = require("./db");

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUND = parseInt(process.env.SALT_ROUND);

mongoose.connect(DB_URL);

const app = express();
app.use(express.json());

/* FUNCTIONS

    # MIDDLEWARES
    signupInputValidation()
    signinInputValidation()
    auth()
    
    # ENDPOINTS 
    /signup
    /signin
    /purchase
    /my-courses
    /add-course
    
    # to add (for admins)
    /course-users -> all user who have this course
    /get-all-users-details
    /see-all-courses

*/

// input validation
function signupInputValidation(req, res, next) {
  // add validation for roles (student, admin)
  const requiredBody = z.object({
    name: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" })
      .max(30, { message: "Must be 30 or fewer characters long" }),
    email: z
      .string()
      .email({ message: "Invalid email address." })
      .min(5, { message: "Must be 5 or more characters long" })
      .max(30, { message: "Must be 30 or fewer characters long" }),
    password: z.string().min(6).max(30),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res
      .status(403)
      .json({ msg: "Invalid input", error: parsedDataWithSuccess.error });
    return;
  }

  next();
}

function signinInputValidation(req, res, next) {
  const requiredBody = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address." })
      .min(5, { message: "Must be 5 or more characters long" })
      .max(30, { message: "Must be 30 or fewer characters long" }),
    password: z.string().min(6).max(30),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res
      .status(403)
      .json({ msg: "Invalid input", error: parsedDataWithSuccess.error });
    return;
  }

  next();
}

app.post("/signup", signupInputValidation, async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(
    `name: ${name}, email: ${email}, password: ${password}, role: ${role}`
  );

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    console.log(hashedPassword);
    await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log(`${name} signed up`);

    res.status(200).json({ msg: "You are signed up!" });
  } catch (e) {
    console.log("error : ", e);

    res.status(403).json({
      error: e.message,
      msg: "Error adding data in DB.",
    });
  }
});

app.post("/signin", signinInputValidation, async (req, res) => {
  const { email, password } = req.body;
  let user, passwordMatch;

  try {
    user = await UserModel.findOne({
      email: email,
    });

    console.log(user);
    passwordMatch = await bcrypt.compare(password, user.password);
  } catch (e) {
    res.status(403).json({ msg: "user not found." });
    return;
  }

  if (!user || !passwordMatch) {
    res.status(403).json({ msg: "Wrong email or password." });
    return;
  }

  const token = JWT.sign({ userId: user._id }, JWT_SECRET);
  res.status(200).header({ token: token }).json({ msg: "You are signed in!" });
});

function auth(req, res, next) {
  const token = req.headers.token;
  try {
    const userId = JWT.verify(token, JWT_SECRET).userId;
    console.log(typeof userId + ", userId: " + userId); // for debugging
    req.userId = userId;
  } catch (e) {
    res.json({ msg: "Invalid token!" });
    return;
  }

  next();
}

app.post("/purchase", auth, async (req, res) => {
  const userId = req.userId;
  const { name, price } = req.body; // course_name, course_price

  try {
    const user = UserModel.findById(userId);
    
    if(user.role === admin){
        res.status(403).json({msg: "You already have access to all courses."});
        return;
    }
    
    const course = await CourseModel.findOne({
      name: name,
      price: parseInt(price),
    });

    await UserModel.updateOne(
      { _id: userId },
      { $push: { purchasedCourses: course._id } }
    );

    res.status(200).json({ msg: `You have purchased ${name} course.` });
  } catch (e) {
    res.status(403).json({ msg: "wrong input.", error: e });
  }
});

app.get("/my-courses", auth, async (req, res) => {
  const userId = req.userId;

  try {
    const user = await UserModel.findOne({
      _id: userId,
    });

    const courses = [];
    const coursesId = user.purchasedCourses;

    for (let id of coursesId) {
      const course = await CourseModel.findOne({ _id: id });
      courses.push(course);
      console.log(course); // for debugging
    }

    res.status(200).json({ courses: courses });
  } catch (e) {
    res.status(403).json({ msg: "cannot find you courses.", error: e.message });
  }
});

app.post("/add-course", auth, async (req, res) => {
  const userId = req.userId;
  const user = await UserModel.findOne({
    _id: userId,
  });

  if (user.role !== "admin") {
    res.status(400).json({ msg: "Unauthorized" });
    return;
  }

  const name = req.body.name;
  const price = Number(req.body.price);

  const course = await CourseModel.findOne({
    name,
    price,
  });

  if (course) {
    res.status(403).json({ msg: "Already added." });
    return;
  }

  await CourseModel.create({
    name,
    price,
  });

  console.log(`Added ${name} course.`);
  res.status(200).json({ msg: `Added ${name} course.` });
});

app.listen(PORT);
