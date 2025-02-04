import { config } from "@/common/config";
import { hash } from "@common/utils";
import { IUser, IUserRepository, IUserService } from "@interfaces/user";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.createUser = this.createUser.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.findUserByEmail = this.findUserByEmail.bind(this);
    this.findUserById = this.findUserById.bind(this);
    this.findAllUsers = this.findAllUsers.bind(this);
    this.findUserByCredentials = this.findUserByCredentials.bind(this);
  }

  async changePassword(userId: string, newPassword: string): Promise<boolean> {
    const updatedUser = await this.userRepository.updateUser(userId, { password: this.hashPassword(newPassword) });
    return updatedUser ? true : false;
  }

  async updateUser(userId: string, updateFields: IUser): Promise<IUser | false> {
    const updatedUser = await this.userRepository.updateUser(userId, updateFields);
    return updatedUser;
  }

  async findUserByEmail(userMail: string): Promise<IUser | false> {
    const user = await this.userRepository.findByEmail(userMail);
    return user;
  }

  async findUserById(userId: string): Promise<IUser | false> {
    const user = await this.userRepository.findById(userId);
    return user;
  }

  async findAllUsers(): Promise<IUser[] | false> {
    const users = await this.userRepository.findAllUsers();
    if (!users) return false;
    return users;
  }

  async createUser(email: string, password: string, phone: string): Promise<IUser | false> {
    const newUser = await this.userRepository.createUser(email, this.hashPassword(password), phone);
    return newUser;
  }

  async findUserByCredentials(email: string, password: string): Promise<IUser | false> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return false;
    if (this.hashPassword(password) !== user.password) return false;
    return user;
  }

  /**
   * Hashes a password using a salt value.
   * @param password - The password to be hashed.
   * @returns The hashed password.
   */
  private hashPassword(password: string): string {
    return hash(password, config?.passwordSalt);
  }
}
