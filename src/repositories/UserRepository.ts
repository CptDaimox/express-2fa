import { IUser, IUserRepository } from "@interfaces/user";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("users", UserSchema);

export class UserRepository implements IUserRepository {
  async findAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.error("Error getting all users: ", error);
      return [];
    }
  }

  async findByEmail(email: string): Promise<IUser | false> {
    const user = await UserModel.findOne({ email: email });
    if (!user) return false;
    return user;
  }

  async findById(id: string): Promise<IUser | false> {
    const user = await UserModel.findById(id);
    if (!user) return false;
    return user;
  }

  async createUser(email: string, password: string, phone: string): Promise<IUser | false> {
    const newUser = new UserModel({ email, password, phone });
    return await newUser.save();
  }

  updateUser(userId: string, name: string, email: string): void {
    throw new Error("Method not implemented.");
  }
}
