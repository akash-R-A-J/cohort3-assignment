require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const { PORT, DB_URL } = require("./config");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  console.log("connecting database...");
  await mongoose.connect(DB_URL);
  app.listen(PORT);
  console.log(`listening on port ${PORT}`);
}

main();
