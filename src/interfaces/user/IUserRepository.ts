export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IUserRepository {
  findAllUsers(): Promise<IUser[] | false>;
  findByEmail(email: string): Promise<IUser | false>;
  findById(id: string): Promise<IUser | false>;
  createUser(email: string, password: string, phone: string): Promise<IUser | false>;
  updateUser(userId: string, name: string, email: string): void;
}
