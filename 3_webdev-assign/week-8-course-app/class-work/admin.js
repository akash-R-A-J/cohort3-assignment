const { Router } = require("express");
const { AdminModel } = require("./db");
const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
  res.json({
    msg: "admin signup endpoint",
  });
});

adminRouter.post("/signin", (req, res) => {
  res.json({
    msg: "admin signin endpoint",
  });
});

// create a course
adminRouter.post("/course", (req, res) => {
  res.json({
    msg: "admin signin endpoint",
  });
});

// change course
adminRouter.put("/course", (req, res) => {
  res.json({
    msg: "admin signin endpoint",
  });
});

// get all courses available
adminRouter.post("/course/bulk", (req, res) => {
  res.json({
    msg: "admin signin endpoint",
  });
});

module.exports = {
  adminRouter,
};
