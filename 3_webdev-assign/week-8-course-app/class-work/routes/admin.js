const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { Router } = require("express");
const { AdminModel, CourseModel } = require("../db");
const { SALT_ROUND, ADMIN_JWT_SECRET } = require("../config");
const { adminAuth } = require("../middleware/admin");
const {
  validateSignupInput,
  validateSigninInput,
} = require("../middleware/user");
const { courseRouter } = require("./course");

const adminRouter = Router();

adminRouter.post("/signup", validateSignupInput, async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const admin = await AdminModel.findOne({
    email,
  });

  if (admin) {
    return res.status(403).json({ msg: "User already exist, try signin-in" });
  }

  try {
    // password hasing with salting
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

    await AdminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.status(200).json({
      msg: "user signed-up!",
    });
  } catch (e) {
    console.log("error: " + e);
    res.status(403).json({ msg: "table creation failed", error: e.message });
  }
});

adminRouter.post("/signin", validateSigninInput, async (req, res) => {
  const { email, password } = req.body;
  const admin = await AdminModel.findOne({
    email,
  });

  if (admin) {
    const passwordMatch = bcrypt.compare(password, admin.password);
    if (passwordMatch) {
      // try doing cookie-based / session-based authentication here

      // token-based authentication
      const token = JWT.sign({ adminId: admin._id }, ADMIN_JWT_SECRET);
      res
        .status(200)
        .header({ token: token })
        .json({ msg: "You are signed in!" });
    } else {
      res.status(403).json({ msg: "wrong password" });
    }
  } else {
    res.status(403).json({ msg: "admin not found" });
  }
});

// create a course
adminRouter.post("/course", adminAuth, async (req, res) => {
  const adminId = req.adminId;
  // add input validation here----->
  // add try-catch block---->
  const { title, description, price, imageUrl } = req.body;

  // creating a web3 saas in 6 hr for image pipeline (instead of using image url)
  const course = await CourseModel.create({
    title,
    description,
    price,
    imageUrl,
    createorId: adminId,
  });

  // add checks here (like if no course fuond)
  res.json({
    msg: "course created",
    id: course._id,
  });
});

// change course
adminRouter.put("/course", adminAuth, async (req, res) => {
  const adminId = req.adminId;
  // add input validation----->
  const { title, description, price, imageUrl, courseId } = req.body;

  // add try-catch block here---->
  const course = await CourseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title,
      description,
      price,
      imageUrl,
    }
  );

  // add checks here (like if no course fuond)
  res.json({
    msg: `updated course ${course._id}`,
  });
});

// get all courses available
adminRouter.get("/course/bulk", adminAuth, async (req, res) => {
  const adminId = req.adminId;

  // add try-catch block here---->
  const courses = await CourseModel.find({
    creatorId: adminId,
  });

  // add checks here (like if no course fuond)
  res.json({
    msg: `Your courses :`,
    courses: courses,
  });
});

module.exports = {
  adminRouter,
};

// improve the last 3 endpoints
// 1. /course (post, put),
// 2. /course/bulk (get)
