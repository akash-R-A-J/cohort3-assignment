const fs = require("fs");
const library = require("./library");
const path = "storage.json";
// const file = require("./storage.json");

let users = [];
library.setPath(path);

// User data structure
// id, username, courses, courseId
// user = {
//  id : "id",
//  username : "name",
//  courses : [{
//    courseId : "coursename"
//  }, {
//     courseId : "coursename"
//  }]
// }

function addUser(id, name, college) {
  let user = {
    id: 1,
    username: "John",
    courses: [
      {
        c1: "Math",
      },
      {
        c2: "Physics",
      },
    ],
  };

  let user2 = {};
  user2.id = id;
  user2.username = name;
  user2.college = college;

  users.push(user);
  users.push(user2);
}

function updateFile() {
  library.writeData(users);
  console.log("File updated successfully.");
}

function fileData() {
  console.log(library.readFileAsObject());
}

// console.log(JSON.stringify(file[1].username));
addUser(2, "Akash", "KIIT");
updateFile();
fileData();
