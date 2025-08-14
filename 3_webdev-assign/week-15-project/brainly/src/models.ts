import mongoose, { Schema, Types } from "mongoose";

// interfaces
interface IUser {
  username: string;
  password: string;
}

interface IContent {
  link: string;
  types: string;
  title: string;
  tags: Types.ObjectId[];
  userId: Types.ObjectId;
}

interface ITag {
  title: string;
}

interface ILink {
  hash: string;
  userId: Types.ObjectId;
}

// schemas
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

const ContentSchema = new Schema<IContent>({
  link: { type: String, required: true },
  types: { type: String, required: true },
  title: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const TagSchema = new Schema<ITag>({
  title: { type: String, required: true },
});

const LinkSchema = new Schema<ILink>({
  hash: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

// models
export const UserModel = mongoose.model<IUser>("User", UserSchema);
export const TagModel = mongoose.model<ITag>("Tag", TagSchema);
export const ContentModel = mongoose.model<IContent>("Content", ContentSchema);
export const LinkModel = mongoose.model<ILink>("Link", LinkSchema);
