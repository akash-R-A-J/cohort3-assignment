// for routing [all users-endpoints]

// const {Router} = require("express"); or use the below two lines

const express = require("express");
const Router = express.Router;

const userRouter = Router();

userRouter.post("/signup", (req, res) => {
  res.json({
    msg: "user signup endpoint",
  });
});

userRouter.post("/signin", (req, res) => {
  res.json({
    msg: "user signin endpoint",
  });
});

// get all my courses
userRouter.get("/purchases", (req, res) => {
  res.json({
    msg: "/user/purchases endpoint",
  });
});

module.exports = {
    userRouter,
}
