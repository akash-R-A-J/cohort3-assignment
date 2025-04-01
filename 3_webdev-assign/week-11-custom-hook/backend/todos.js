const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(express.json());

app.use(
  cors({
    // or origin: []
    domains: ["http://localhost:5173"],
  })
);

// using in-memory variable for now
const TODOS = [
  {
    id: 1,
    title: "todo-1",
    description: "hit the gym from 7-9",
  },
  {
    id: 2,
    title: "todo-2",
    description: "eat food from 9-10",
  },
];

// endpoints
app.get("/todos", (req, res) => {
  const id = parseInt(req.query.id);
  const todo = TODOS.find((x) => x.id === id);
  res.status(200).json({ todo });
});

// listening on this port
app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
