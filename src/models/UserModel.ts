import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

/**
 * Represents the user schema.
 */
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
