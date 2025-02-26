const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

// user Schema (easy)
// const User = new Schema({
//   email: String,
//   password: String,
//   name: String,
// });

// user Schema (hard)
const User = new Schema({
    email: {type: String, unique: true},
    password: String,
    name: String,
}) 

// to-do Schema
const Todo = new Schema({
  title: String,
  done: Boolean,
  userId: ObjectId,
});

// in which collection you want to put your data into and what will be the schema for that
// model lets us insert data in the given collection with the given schema;
const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

// exporting these two models
module.exports = {
  UserModel,
  TodoModel,
};
