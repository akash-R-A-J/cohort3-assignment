const express = require("express");

const app = express();

// checks if the input is valid or notF
function checkValidInput(req, res, next) {
  if (req.path === "/favicon.ico") {
    return next();
  }

  const a = req.query.a || "";
  const b = req.query.b || "";

  console.log();
  console.log(`${typeof a}, ${typeof b}`);
  console.log(`${a.length} : ${b.length}`);

  if (a.length === 0 || b.length === 0) {
    return res.status(400).json({ error: "Please enter a valid input." });
  }

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: "Inputs must be numeric." });
  }

  next();
}

// logs the method, url and the timestamp
function logger(req, res, next) {
  console.log("Method is " + req.method);
  console.log("URL is " + req.url);
  console.log("Host is " + req.hostname);
  console.log("Timestamp is " + new Date());
  next();
}

// return the sum of the inputs
function sum(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.status(200).json({ Sum: (a + b).toString() });
}

// return the difference of the inputs
function subtract(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.status(200).json({ Difference: (a - b).toString() });
}

// return the product of the inputs
function multiply(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.status(200).json({ Product: (a * b).toString() });
}

// middleware chaining
app.use(checkValidInput, logger);

app.get("/sum", sum); // sum endpoint
app.get("/subtract", subtract); // subtract endpint
app.get("/multiply", multiply); // multiply endpoint

app.listen(3000);
