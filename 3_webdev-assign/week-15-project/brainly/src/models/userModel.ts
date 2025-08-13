import mongoose, {Document, Schema} from "mongoose";

interface IUser extends Document {
    username: string;
    password: string;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("user", UserSchema);

export default UserModel;
