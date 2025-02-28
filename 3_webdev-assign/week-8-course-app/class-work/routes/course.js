// for routing [all course-endpoints]

const { Router } = require("express");
const { userAuth } = require("../middleware/user");
const { CourseModel, PurchaseModel } = require("../db");
const courseRouter = Router();

// purchase this course
courseRouter.post("/purchase", userAuth, async (req, res) => {
  const userId = req.userId;
  // const title = req.body.title; used for given title
  const courseId = req.body.courseId;
  
  try {
    const course = await CourseModel.findOne({
      _id: courseId,
    });

    if (course) {
      const purchase = await PurchaseModel.create({
        courseId,
        userId,
      });

      res.status(200).json({
        msg: "Congratulations for purchasing this course",
        purchaseId: purchase._id,
      });
    } else {
      res.status(400).json({ msg: "course not found", courseId, course });
    }
  } catch (e) {
    res
      .status(403)
      .json({ msg: "Please select the correct course.", error: e });
  }
});

// get all courses available
// doesn't need to be authenticated, all the users can see the available courses
courseRouter.get("/preview", async (req, res) => {
  try {
    const courses = await CourseModel.find({}); // fetch all courses available

    if (courses.length === 0) {
      return res
        .status(200)
        .json({ msg: "Sorry, no courses available right now." });
    }

    res.json({
      msg: "courses endpoint",
      courses,
    });
  } catch (e) {
    res.status(400).json({ msg: "course not found.", error: e });
  }
});

module.exports = {
  courseRouter,
};
