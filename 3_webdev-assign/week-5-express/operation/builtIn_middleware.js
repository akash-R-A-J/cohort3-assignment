const express = require("express");
const bodyparser = require("body-parser");

const app = express();

//express.json() middleware is used to parse json data before using it
// sent by body as 'post or put' request
// body will be 'undefined' if we will not parse the json data sent by the body

// app.use(express.json()); // or
app.use(bodyparser.json());

function sum(req, res) {
  console.log(req.body);
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  res.status(200).json({
    sum: a + b,
  });
}

app.post("/sum", sum);

app.listen(3000);
