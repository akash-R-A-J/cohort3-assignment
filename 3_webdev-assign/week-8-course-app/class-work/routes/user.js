// for routing [all users-endpoints]
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { Router } = require("express"); //or use the below two lines
const { UserModel, PurchaseModel, CourseModel } = require("../db");
const { SALT_ROUND, USER_JWT_SECRET } = require("../config");
const { userAuth } = require("../middleware/user");
const {
  validateSignupInput,
  validateSigninInput,
} = require("../middleware/inputValidators");

const userRouter = Router();

// signup-endpoint for users
userRouter.post("/signup", validateSignupInput, async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const user = await UserModel.findOne({
    email,
  });

  if (user) {
    return res.status(403).json({ msg: "User already exist, try signin-in" });
  }

  try {
    // password hasing with salting
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

    console.log("hii there : " + hashedPassword);
    await UserModel.create({
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

// user sign-in endpoint
userRouter.post("/signin", validateSigninInput, async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
  });

  if (user) {
    const passwordMatch = bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // try doing cookie-based / session-based authentication here

      // token-based authentication
      const token = JWT.sign({ userId: user._id }, USER_JWT_SECRET);
      res
        .status(200)
        .header({ token: token })
        .json({ msg: "You are signed in!" });
    } else {
      res.status(403).json({ msg: "wrong password" });
    }
  } else {
    res.status(403).json({ msg: "user not found" });
  }
});

// get all my courses
userRouter.get("/my-purchases", userAuth, async (req, res) => {
  const userId = req.userId;

  try {
    const purchases = await PurchaseModel.find({
      userId,
    });

    const courses = await CourseModel.find({
      _id: {$in: purchases.map(x => x.courseId)}
    });
    
    // or
    // const courses = [];
    // for (let purchase of purchases) {
    //   try {
    //     const course = await CourseModel.findById({
    //       _id: purchase.courseId,
    //     });

    //     courses.push(course);
    //   } catch (e) {
    //     res.status(403).json({
    //       msg: `course not found for id: ${purchase.courseId}`,
    //       error: e,
    //     });
    //   }
    // }

    res.json({
      msg: `here are your courses`,
      courses,
      purchases
    });
  } catch (e) {
    res.status(403).json({ msg: "Try purchasing one!", error: e });
  }
});

module.exports = {
  userRouter,
};
