const express = require("express");
const path = require("path");
const file = require("./file.js");
const JWT = require("jsonwebtoken");
const { decode } = require("punycode");
const JWT_SECRET = "AYEXIDSIALJSSJSJINXYWIWJL";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // for css and js FE files

// for serving both server on same port
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };

  if (file.isPresent(user)) {
    return res.status(409).json({
      msg: "You are already signed up, try signing in.",
    });
  }

  // add user in the databse
  file.addUser(user);

  res.status(200).json({
    msg: "You are signed up",
  });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  const foundUser = file.isPresent(user);

  if (!foundUser) {
    return res.status(403).json({
      msg: "sign-up first!",
    });
  }

  const token = JWT.sign({ username }, JWT_SECRET);

  res
    .header("Authorization", `Bearer ${token}`)
    .status(200)
    .json({ msg: "Signin successful!" });
});

// verifies JWT
function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = JWT.verify(token, JWT_SECRET);
    req.body.username = decoded.username;
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized: Invalid token." });
  }

  next();
}

app.post("/add-todo", auth, (req, res) => {
  try {
    const username = req.body.username;
    const todo = req.body.todo;
    const users = file.getUsersObject();
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    // Initialize todos array if it doesn't exist
    user.todos = user.todos || [];

    user.todos.push({
      id: Date.now(),
      todo: todo,
      completed: false,
    });

    file.writeUsersObject(users);

    res.status(200).json({
      todos: user.todos,
      msg: "Todo added successfully!",
    });
  } catch (error) {
    return res.status(401).json({ msg: "Error in adding todos." });
  }
});

app.post("/delete-todo", (req, res) => {});

app.post("/update-todo", (req, res) => {});

app.post("/mark-todo", (req, res) => {});

app.listen(3000);
