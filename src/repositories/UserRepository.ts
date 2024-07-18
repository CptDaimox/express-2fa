import { IUser, IUserRepository, IUserUpdate } from "@interfaces/user";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  twoFactorCode: { type: String },
  twoFactorExpiry: { type: Date },
});

const UserModel = mongoose.model<IUser>("users", UserSchema);

export class UserRepository implements IUserRepository {
  async findAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserModel.find().select("email name phone");
      return users;
    } catch (error) {
      console.error("Error getting all users: ", error);
      return [];
    }
  }

  async findByEmail(email: string): Promise<IUser | false> {
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) return false;
      return user;
    } catch (error) {
      console.error("Error getting user: ", error);
      return false;
    }
  }

  async findById(id: string): Promise<IUser | false> {
    try {
      const user = await UserModel.findById(id, "email name phone");
      if (!user) return false;
      return user;
    } catch (error) {
      console.error("Error getting user: ", error);
      return false;
    }
  }

  async createUser(email: string, password: string, phone: string): Promise<IUser | false> {
    try {
      const newUser = new UserModel({ email, password, phone });
      return await newUser.save();
    } catch (error) {
      console.error("Error creating user: ", error);
      return false;
    }
  }

  async updateUser(userId: string, updateFields: IUserUpdate): Promise<IUser | false> {
    try {
      const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, updateFields, {
        new: true,
      });

      if (!updatedUser) return false;

      return updatedUser;
    } catch (error) {
      console.error("Error updating user: ", error);
      return false;
    }
  }
}
