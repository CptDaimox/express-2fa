import { IUser, IUserUpdate } from "./IUserRepository";

export interface IUserService {
  changePassword(userId: string, newPassword: string): Promise<boolean>;
  updateUser(userId: string, updateFields: IUserUpdate): Promise<IUser | false>;
  findUserByEmail(userMail: string): Promise<IUser | false>;
  findUserById(userId: string): Promise<IUser | undefined>;
  findAllUsers(): Promise<IUser[] | false>;
  createUser(email: string, password: string, phone: string): Promise<IUser | false>;
  findUserByCredentials(email: string, password: string): Promise<IUser | false>;
}
