// in package.json (line-13) : file => ^4.18.2 or ^4.19.1

const express = require('express')
const app = express() // app object
const port = 3000

const USERS = []; // maybe admin
const QUESTIONS = [{
    title: "Two States",
    description: "Given an array, return the maximum of the array?",
    testCases: [{
        input: "{1, 4, 3}",
        output: "4"},
    {
        input: "{5, 9, 6, 8, 3}",
        output: "9"    
    }]
}];

const SUBMISSIONS = [];

app.post('/signup', function(req, res) {
    // add logic to decode body
    // body should have email and password

    // store email and password (as if for now) in the USERS array above (only if the user with the given email doesn't exist)
    
    // return back 200 status code to the client
    res.send('Hello World! (signup)')
})

app.post('/login', function(req, res) {
    // add logic to decode body
    // body should have email and password

    // check if the user with given email exists in the USERS array
    // also ensure that the password is the same

    // if the password is same, return back the 200 status code to the client
    // also send back a token (any random strings will do for now)
    // if the password is not the same then return back the 404 status code to the client

  res.json({
    name: 'John',
    age: 30
  })
})

app.get('/questions', function(req, res) {
    // return the user all the question in the QUESTIONS array
  res.send('<html><body><h1 style="color:red">Questions</h1></body></html>')
})

app.get('/submissions', function(req, res) {
  // returns the users submissions for this problem
res.send('<html><body><h1 style="color:red">Submissions</h1></body></html>')
})

app.post('/submissions', function(req, res) {
    // let the user submit a problem, randomly accept or reject the solution
    // store the submission in the SUBMISSION array above
  res.send('<html><body><h1 style="color:red">Submissions</h1></body></html>')
})

app.listen(port, function() { // starts http server
  console.log(`Example app listening on port ${port}`)
})

//  hard todos
//  Create a route that lets add a new problem
//  ensures only admin can do that