const express = require("express");
const app = express();

// 1st: implement this
let todos = [];

// 2nd: then try to implement for different users
let users = {
  1: {
    todos: [],
  },
  2: {
    todos: [],
  },
};

// 3rd: store the data in a file, foundation for databases
// add user logic => which is implementing the 2nd
app.post('/', function(req, res) {
    // create a random id for the todo
    // extract the todo title from the body
    todos.push({
        title,
        id
    })
})

app.delete('/', function (req, res){
    // extract the todo id
    // remove the todo from here
})
