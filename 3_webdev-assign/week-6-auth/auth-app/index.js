const express = require("express");

const app = express();
app.use(express.json());

const users = [];
const options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
  'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
  'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1',
  '2', '3', '4', '5', '6', '7', '8', '9'];

function generateToken() {

  let token = "";
  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }

  return token;
}

app.post("/signup", (req, res) => {
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
});

// return a random string token whenever a user sign-in
app.post("/signin", (req, res) => {
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
    const token = generateToken();
    foundUser.token = token;
    res.status(200).json({
      token: token,
    });
  } else {
    res.status(400).json({
      message: "wrong password.",
    });
  }
  console.log(users);
});

app.get("/me", (req, res) => {
  // tokens are present in headers
  const token = req.headers.authorization;
  const foundUser = users.find((u) => u.token === token); // hitting the database
  if (foundUser) {
    res.status(200).json({
      username: foundUser.username,
    });
  } else {
    res.status(400).json({
      message: "Invalid token - Unauthorized",
    });
  }
});

app.listen(3000); // http server is running on port 3000
