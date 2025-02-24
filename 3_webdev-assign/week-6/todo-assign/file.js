const fs = require("fs");
const filepath = "./data.json";

// read file as object
function getUsersObject() {
  let users = [];
  try {
    const userString = fs.readFileSync(filepath, "utf-8");
    users = JSON.parse(userString) || [];
  } catch (err) {
    console.log("error reading file : ", err);
  }
  return users;
}

// write into file
function writeUsersObject(users) {
  try {
    fs.writeFileSync(filepath, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.log("error writing in files ", err);
  }
}

// check if the user object is already present or not
function isPresent(user) {
  const users = getUsersObject();
  const foundUser = users.find(
    (u) => u.username === user.username && u.password === user.password
  );
  return foundUser ? foundUser : false;
}

// add a user in the database
function addUser(user) {
  const users = getUsersObject();
  users.push(user);
  writeUsersObject(users);
  console.log("user added " + user);
}

function getUser(username) {
  const users = getUsersObject();
  const foundUser = users.find(u => u.username === username);
  return foundUser;
}

// clear all the data from database
function clearData() {
  fs.writeFileSync(filepath, "[]", "utf-8");
  console.log("All data cleared. data.json is now empty.");
}

// add todo of the user
function addTodo(username, todo) {}

module.exports = {
  getUsersObject,
  writeUsersObject,
  isPresent,
  addUser,
  clearData,
};
