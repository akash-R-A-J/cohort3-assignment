const express = require("express");

const app = express();

// using middleware you don't have to worry about the checking,
// you need to just do your work (send you result to the request)

// middleware for checking age of a person
function isOldEnoughMiddleware(req, res, next) {
  if (req.query.age > 14) {
    next();
  } else {
    res.status(411).json({
      msg: "You are not old enough.",
    });
  }
}

// If you want the middleware to be used on all the routes then you can use:
app.use(isOldEnoughMiddleware);
// It will work for all the routes defined below it.
// And after this you don't have to call middleware from the route's signature, you can use like this:
app.get("/ride3", function (req, res) {
  res.send({
    msg: "You have successfully riden the ride 1.",
  });
});

// for ride1 endpoints
// express is a series of middleware so control willreach first at "/ride1" then
// the function 'isOldEnough' gets called after then the function defined here is called
app.get("/ride1", isOldEnoughMiddleware, function (req, res) {
  res.send({
    msg: "You have successfully riden the ride 1.",
  });
});

// for ride2 endpoints
app.get("/ride2", isOldEnoughMiddleware, function (req, res) {
  res.send({
    msg: "You have successfully riden the ride 2.",
  });
});

app.listen(3000);
