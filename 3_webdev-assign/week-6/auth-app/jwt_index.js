const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ieynwixuwsixmongyyenwd";

const app = express();
app.use(express.json());

const users = [];

function signup(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // we can add input validations here

  if (users.find((u) => u.username === username)) {
    return res.status(200).json({
      message: "You are already signed in!",
    });
  }

  users.push({
    username: username,
    password: password,
  });

  console.log(users);

  res.status(200).json({
    message: "You are signed up!",
  });
}

function signin(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!users.find((u) => u.username === username)) {
    return res.status(400).json({
      message: "Sign-up first.",
    });
  }

  let foundUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (foundUser) {
    // this tokens will contain username
    // signed using JWT_SECRET
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );

    res.status(200).json({
      token: token,
    });
  } else {
    res.status(400).json({
      message: "wrong password.",
    });
  }

  console.log(token);
  console.log(users);
}

// should return username and the password
function me(req, res) {
  // tokens are present in headers
  const token = req.headers.authorization;
  const decodedInfo = jwt.verify(token, JWT_SECRET);
  const username = decodedInfo.username;

  // for password we have to hit the database, but not for username
  const foundUser = users.find((u) => u.username === username);

  if (foundUser) {
    res.status(200).json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.status(400).json({
      message: "Invalid token - Unauthorized",
    });
  }
}

app.post("/signup", signup);
app.post("/signin", signin); // return a random string token whenever a user sign-in
app.get("/me", me);

app.listen(3000);
