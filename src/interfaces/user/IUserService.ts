import { IUser } from "./IUserRepository";

export interface IUserService {
  register(name: string, email: string, mobile: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<IUser>;
  changePassword(userId: string, newPassword: string): Promise<boolean>;
  updateUser(userId: string, name: string, email: string): Promise<boolean>;
  findUserByEmail(userId: string): Promise<IUser | false>;
  findUserById(userId: string): Promise<IUser | undefined>;
  findAllUsers(): Promise<IUser[] | false>;
}
