const express = require("express");

const app = express();

// for this function
// URL => http://localhost:3000/add?a=2&b=5
app.get("/add", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.status(200).send((a + b).toString());
});

// for this function
// URL => http://localhost:3000/add/2/5
app.get("/add/:a/:b", (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);
  res.status(200).send((a + b).toString());
});

app.get("/subtract", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.status(200).send((a - b).toString());
});

app.get("/multiply", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.status(200).send((a * b).toString());
});

app.get("/divide", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.status(200).send((a / b).toString());
});

app.listen(3000);
