const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// for users
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  role: { type: String, enum: ["student", "admin"], default: "student" },
});

const CourseSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const UserModel = mongoose.model("User", UserSchema);
const CourseModel = mongoose.model("Course", CourseSchema);

async function deleteData(Model) {
  await Model.deleteMany({});
  console.log(
    `all documents of ${Model} collections are deleted from the database.`
  );
}

async function deleteCollection(Model) {
  await Model.collection().drop();
  console.log(`${Model} collection deleted from the database.`);
}

module.exports = {
  UserModel,
  CourseModel,
  deleteData,
  deleteCollection,
};
