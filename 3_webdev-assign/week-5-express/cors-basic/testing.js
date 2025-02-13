const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors()); // allow all origins for sending request

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

app.listen(3000);
