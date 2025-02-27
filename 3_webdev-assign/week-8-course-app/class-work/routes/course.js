// for routing [all course-endpoints]

const { Router } = require("express");
const courseRouter = Router();

// purchase this course
courseRouter.post("/purchase", (req, res) => {
  res.json({
    msg: "/course/purchase endpoint",
  });
});

// get all courses available
courseRouter.get("/preview", (req, res) => {
  res.json({
    msg: "courses endpoint",
  });
});

module.exports = {
  courseRouter,
};
