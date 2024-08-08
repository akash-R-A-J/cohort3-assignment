// when clicked on login/signup buttons, it will take user to the respective page
document.getElementById('loginBtn').addEventListener('click', function() {
  window.location.href = 'login.html';
});

document.getElementById('signupBtn').addEventListener('click', function() {
  window.location.href = 'signup.html';
});

// after submitting the login form
document.getElementById('loginSubmit').addEventListener('click', async function() {
  console.log('login submit');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      const response = await fetch('/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log(data); // Handle response from the server
  } catch (error) {
      console.error('Error:', error);
  }
});

// this will handle signup button post request
document.getElementById('signupSubmit').addEventListener('click', async function() {
  console.log('signup submit');
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      const response = await fetch('/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
      });

      const data = await response.text(); // or response.json() based on server response
      console.log(data); // Handle response from the server
  } catch (error) {
      console.error('Error:', error);
  }
});

// in package.json (line-13) : file => ^4.18.2 or ^4.19.1

// const express = require('express')
// const app = express() // app object
// const port = 3000

// const USERS = []; //  email -> password (with admin or not) : MAP
// const QUESTIONS = [{
//     title: "Two States",
//     description: "Given an array, return the maximum value of the array?",
//     testCases: [{
//         input: "{1, 4, 3}",
//         output: "4"},
//     {
//         input: "{5, 9, 6, 8, 3}",
//         output: "9"    
//     }]
// }];

// const SUBMISSIONS = [];

// app.post('/signup', function(req, res) {
//     // add logic to decode body
//     // body should have email and password

//     // store email and password (as if for now) in the USERS array above (only if the user with the given email doesn't exist)
    
//     // return back 200 status code to the client
//     res.send('Hello World! (signup)')
// })

// app.post('/login', function(req, res) {
//     // add logic to decode body
//     // body should have email and password

//     // check if the user with given email exists in the USERS array
//     // also ensure that the password is the same

//     // if the password is same, return back the 200 status code to the client
//     // also send back a token (any random strings will do for now)
//     // if the password is not the same then return back the 404 status code to the client

//   res.json({
//     name: 'John',
//     age: 30
//   })
// })

// app.get('/questions', function(req, res) {
//     // return the user all the question in the QUESTIONS array
//   res.send('<html><body><h1 style="color:red">Questions</h1></body></html>')
// })

// app.get('/submissions', function(req, res) {
//   // returns the users submissions for this problem
// res.send('<html><body><h1 style="color:red">Submissions</h1></body></html>')
// })

// app.post('/submissions', function(req, res) {
//     // let the user submit a problem, randomly accept or reject the solution
//     // store the submission in the SUBMISSION array above
//   res.send('<html><body><h1 style="color:red">Submissions</h1></body></html>')
// })

// app.listen(port, function() { // starts http server
//   console.log(`Example app listening on port ${port}`)
// })

//  hard todos
//  Create a route that lets add a new problem
//  ensures only admin can do that