const express = require("express");
const app = express();
// You have been given an express servers which has a few endpoints
// Your task is to :
//  1. Ensure that if there is ever an Exception, the end user sees a status code of 404
//  2. Maintain a errorCount variable whose value should go up everytime there is an exception in any endpoints

let errorCount = 0;

app.get("/user1", (req, res) => {
  throw new Error("User not found.");
});

app.get("/user2", (req, res) => {
  res.status(200).json({ name: "John" });
});

app.get("/errorCount", function (req, res) {
  res.status(200).json({ "Error Count": errorCount });
});

app.use((err, req, res, next) => {
  if (err) {
    errorCount++;
    res.status(404).json({ msg: err + " Exception Occured" });
  } else {
    next();
  }
});

app.listen(3000);
