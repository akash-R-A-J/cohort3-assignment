// creating an http server using express
// express is an external library (it doesn't some bundled with node like fs does).

const express = require("express");

function sumToN(n) {
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    ans += i;
  }
  return ans;
}

const app = express();

app.get("/", (req, res) => {
  let n = req.query.n;
  let sum = sumToN(n);
  res.send(sum.toString());
});

app.listen(3000);
