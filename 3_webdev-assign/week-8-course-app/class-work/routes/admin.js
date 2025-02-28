const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { Router } = require("express");
const { AdminModel, CourseModel } = require("../db");
const { SALT_ROUND, ADMIN_JWT_SECRET } = require("../config");
const { adminAuth } = require("../middleware/admin");
const {
  validateSignupInput,
  validateSigninInput,
  addCourseInputValidation,
} = require("../middleware/inputValidators");

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
adminRouter.post(
  "/add-course",
  addCourseInputValidation,
  adminAuth,
  async (req, res) => {
    const adminId = req.adminId;
    // add try-catch block---->
    const { title, description, price, imageUrl } = req.body;

    // creating a web3 saas in 6 hr for image pipeline (instead of using image url)
    const course = await CourseModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId: adminId,
    });

    // add checks here (like if no course fuond)
    res.json({
      msg: "course created",
      id: course._id,
      adminId,
    });
  }
);

// change/update course
adminRouter.put(
  "/update-course",
  addCourseInputValidation,
  adminAuth,
  async (req, res) => {
    const adminId = req.adminId;
    const { title, description, price, imageUrl, courseId } = req.body;

    try {
      // only creator of the course can update that course
      const updatedCourse = await CourseModel.findOneAndUpdate(
        { _id: courseId, creatorId: adminId },
        { $set: { title, description, price, imageUrl } },
        { new: true } // Returns the updated document
      );

      if (!updatedCourse) {
        return res
          .status(404)
          .json({ msg: "Course not found or not updated." });
      }

      res.json({
        msg: `Updated course ${updatedCourse._id}`,
        updatedCourse,
        courseId,
        adminId,
      });
    } catch (e) {
      res.status(403).json({ msg: "Course not found.", error: e });
    }
  }
);

// get all his courses
adminRouter.get("/course/bulk", adminAuth, async (req, res) => {
  const adminId = req.adminId;

  try {
    const courses = await CourseModel.find({
      creatorId: adminId,
    });

    if (courses.length === 0) {
      return res.json({
        msg: `You haven't created a course yet.`,
      });
    }

    res.json({
      msg: `Your courses :`,
      courses: courses,
    });
  } catch (e) {
    res.status(500).json({ msg: "Cannot query database", error: e });
  }
});

module.exports = {
  adminRouter,
};

// tested all endpoints: all endpoints working as expected
