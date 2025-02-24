const express = require("express");
const JWT = require("jsonwebtoken");
const JWT_SECRET = "EUGYBXKWDJWOJDWIEOFH";

const app = express();
app.use(express.json());

const users = [];

// both FE and BE are hosted on same server: for avoiding cors in this case
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// add the user in the users if not present, and return a message
app.post("/signup", (req, res) => {
    const {username, password} = req.body;

  if (users.find((u) => u.username === username)) {
    return res.status(200).json({ msg: "You are already signed up!" });
  }

  users.push({ username, password });

  res.status(200).json({ msg: "You are signed up!" });

  console.log(users); // for debugging
});

// return a JWT, if the credentials are correct
app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = users.find(
    (u) => u.username === username && u.password === password
  );
  if (foundUser) {
    // token is signed by this server
    const token = JWT.sign(
      {
        username,
      },
      JWT_SECRET
    );

    foundUser.token = token;

    res.status(200).json({
      token: token,
    });

    console.log("token: " + token);
  } else {
    res.status(403).json({
      msg: "Invalid username or password",
    });
  }

  console.log(users);
});

// auth middleware to verify if a user is logged in or not while hitting the '/me' endpoint
function auth(req, res, next) {
  const token = req.headers.token;
  console.log("using auth middleware " + token);
  const decodedInfo = JWT.verify(token, JWT_SECRET);

  if (!decodedInfo.username) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }

  req.username = decodedInfo.username;
  next();
}

// return username after verifying the token
app.get("/me", auth, (req, res) => {
  const username = req.username;
  const foundUser = users.find((u) => u.username === username);

  if (!foundUser) {
    return res.status(403).json({
      msg: "user not found",
    });
  }

  res.status(200).json({
    username: foundUser.username,
  });
});

app.listen(3000);
