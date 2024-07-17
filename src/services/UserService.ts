import { HttpException } from "@/middlewares/errorHandler";
import { IUser, IUserRepository, IUserService } from "@interfaces/user";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  register(name: string, email: string, mobile: string, password: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  login(email: string, password: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  changePassword(userId: string, newPassword: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  updateUser(userId: string, name: string, email: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async findUserByEmail(userId: string): Promise<IUser | false> {
    const user = await this.userRepository.findByEmail(userId)
    return user;
  }
  findUserById(userId: string): Promise<IUser | undefined> {
    throw new Error("Method not implemented.");
  }
  async findAllUsers(): Promise<IUser[] | false> {
    const users = await this.userRepository.findAllUsers();
    if (!users) return false;
    return users;
  }
}
