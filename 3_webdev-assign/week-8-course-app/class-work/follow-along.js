require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("./user");
const adminRouter = require("./admin");
const courseRouter = require("./course");

const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  console.log("connecting database...");
  await mongoose.connect(process.env.DB_URL);
  app.listen(3000);
}

main();
