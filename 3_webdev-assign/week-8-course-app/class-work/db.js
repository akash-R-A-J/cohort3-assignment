const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// schema for users/admins
// (just for understanding) contains data of all users, admins
const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

// schema for courses
// (just for understanding) contains data for all courses
const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

// schema for purchases
// (just for understanding)contains data of all purchases
const purchaseSchema = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const UserModel = mongoose.model("user", userSchema);
const AdminModel = mongoose.model("user", adminSchema);
const CourseModel = mongoose.model("user", courseSchema);
const PurchaseModel = mongoose.model("user", purchaseSchema);

module.exports = {
  UserModel,
  AdminModel,
  CourseModel,
  PurchaseModel,
};
