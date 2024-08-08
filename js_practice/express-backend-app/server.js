const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const USERS = []; // email -> password (with admin or not) : MAP
const QUESTIONS = [{
  title: "Two States",
  description: "Given an array, return the maximum value of the array?",
  testCases: [{
      input: "{1, 4, 3}",
      output: "4"
    },
    {
      input: "{5, 9, 6, 8, 3}",
      output: "9"
    }
  ]
}];

const SUBMISSIONS = [];

app.use(express.static(path.join(__dirname, '.')));
app.use(express.json()); // Middleware to parse JSON bodies

app.post('/signup', function(req, res) {
  const { email, password } = req.body;
  const userExists = USERS.find(user => user.email === email);
  if (!userExists) {
    USERS.push({ email, password });
    res.status(200).send('Signup successful');
  } else {
    res.status(400).send('User already exists');
  }
});

app.post('/login', function(req, res) {
  const { email, password } = req.body;
  const user = USERS.find(user => user.email === email && user.password === password);
  if (user) {
    res.status(200).json({ token: 'randomToken123' });
  } else {
    res.status(404).send('Invalid email or password');
  }
});

app.get('/questions', function(req, res) {
  res.json(QUESTIONS);
});

app.get('/submissions', function(req, res) {
  res.json(SUBMISSIONS);
});

app.post('/submissions', function(req, res) {
  const { submission } = req.body;
  const accepted = Math.random() > 0.5;
  SUBMISSIONS.push({ submission, accepted });
  res.status(200).send(`Submission ${accepted ? 'accepted' : 'rejected'}`);
});

app.listen(port, function() {
  console.log(`Server running at http://localhost:${port}/`);
});
