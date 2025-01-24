const express = require("express");
const cors = require("cors");

const app = express();

// here all domains can send the request
app.use(cors(), express.json());

// if you want cors to restrict to certain domains then use this:
// app.use(cors({
//      domains: ["http://google.com", "https://employee.xyz.com"]
// }))

// for hosting frontend and backend on the same server, we can use this:
// app.use("/", (req, res) => {
//   console.log(__dirname);
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/sum", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.status(200).json({
    sum: a + b,
  });
});

app.post("/sum", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  const sum = a + b;
  console.log(`adding the numbers ${a} and ${b}.`);
  console.log("sum = " + sum);
  res.status(200).json({
    sum: sum,
  });
});

app.get("/random", (req, res) => {
  res.status(200).json({
    name: "abcxyz",
    password: "1234",
  });
});

app.listen(3000);
