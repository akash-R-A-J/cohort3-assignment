const express = require("express");

const app = express();

// function that returns a boolean if the person age is greater than 14
function isOldEnough(age) {
  if (age > 14) return true;
  return false;
}

// for ride1 endpoints
app.get("/ride1", (req, res) => {
  if (isOldEnough(req.query.age)) {
    res.json({
      msg: "You have successfully riden the ride 1.",
    });
  } else {
    res.status(411).json({
      msg: "You are not old enough.",
    });
  }
});

// for ride2 endpoints
app.get("/ride2", (req, res) => {
  if (isOldEnough(req.query.age)) {
    res.json({
      msg: "You have successfully riden the ride 2.",
    });
  } else {
    res.status(411).json({
      msg: "You are not old enough.",
    });
  }
});

app.listen(3000);
