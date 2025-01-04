// 1. you have to count the number of request that went to your server using a global middleware
const express = require("express");

const app = express();
let requestCount = 0;

app.use(function (req, res, next) {
  requestCount++;
  next();
});

app.get("/user", (res, req) => {
  req.status(200).json({
    name: "John",
  });
});

app.post("/user", function (req, res) {
  res.status(200).json({
    msg: "created dummy user",
  });
});

app.get("/requestCount", function (req, res) {
  res.status(200).json({ requestCount });
});

app.listen(3000);
