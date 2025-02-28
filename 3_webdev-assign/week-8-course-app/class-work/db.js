const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
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

// or define 'userSchema' like this with 'reference' to course
// using this we don't need another 'purchaseSchema'
/*
    const userSchema2 = new Schema({
      email: { type: String, unique: true },
      password: String,
      firstName: String,
      lastName: String,
      purchasedCourses: [
        {
          type: ObjectId,
          ref: "course", // reference to course collection
        },
      ],
    });
*/

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

// add schema for course-content
// contents details
// and courseId (of which this content is)
const contentSchema = new Schema({
  title: String,
  contentUrl: String,
  dexcription: String,
  courseId: ObjectId,
});

const UserModel = mongoose.model("user", userSchema);
const AdminModel = mongoose.model("admin", adminSchema);
const CourseModel = mongoose.model("course", courseSchema);
const PurchaseModel = mongoose.model("purchase", purchaseSchema);
const ContentModel = mongoose.model("content", contentSchema);

module.exports = {
  UserModel,
  AdminModel,
  CourseModel,
  PurchaseModel,
  ContentModel,
};

/* FOR REFERENCE IN MONGODB */

// for the userSchema2 we can use this to add data in the database/collection related to this schema
// the below function will push the courseId in the purchasedCourses array/field of the user with this username
/*
      async function update(username, courseId) {
        const UserModel2 = mongoose.model("user2", userSchema2);
        await UserModel2.updateOne(
          {
            username,
          },
          {
            "$push": {
              purchasedCourses : courseId,
            },
          }
        );
      }
*/

// this function will return all the purchases of the user
/*
      userRouter.get("/purchases", async (req, res) => {
        // use middlewares and try-catch ---->
        
        const user = await UserModel.findOne({
          username: req.headers.username,
        });
      
        console.log(user.purchasedCourses);
        const courses = await CourseModel.find({
          _id: {
            $in: user.purchasedCourses,
          },
        });
      
        res.json({
          courses,
        });
      });

*/
