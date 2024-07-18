import { IUser, IUserUpdate } from "./IUserRepository";

/**
 * Represents a service for managing user operations.
 */
export interface IUserService {
  /**
   * Changes the password for a user.
   * @param userId - The ID of the user.
   * @param newPassword - The new password.
   * @returns A promise that resolves to a boolean indicating whether the password was successfully changed.
   */
  changePassword(userId: string, newPassword: string): Promise<boolean>;

  /**
   * Updates the fields of a user.
   * @param userId - The ID of the user.
   * @param updateFields - The fields to be updated.
   * @returns A promise that resolves to the updated user object, or `false` if the user was not found.
   */
  updateUser(userId: string, updateFields: IUserUpdate): Promise<IUser | false>;

  /**
   * Finds a user by their email.
   * @param userMail - The email of the user.
   * @returns A promise that resolves to the user object, or `false` if the user was not found.
   */
  findUserByEmail(userMail: string): Promise<IUser | false>;

  /**
   * Finds a user by their ID.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the user object, or false if the user was not found.
   */
  findUserById(userId: string): Promise<IUser | false>;

  /**
   * Finds all users.
   * @returns A promise that resolves to an array of user objects, or `false` if no users were found.
   */
  findAllUsers(): Promise<IUser[] | false>;

  /**
   * Creates a new user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @param phone - The phone number of the user.
   * @returns A promise that resolves to the created user object, or `false` if the user could not be created.
   */
  createUser(email: string, password: string, phone: string): Promise<IUser | false>;

  /**
   * Finds a user by their email and password.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves to the user object, or `false` if the user was not found.
   */
  findUserByCredentials(email: string, password: string): Promise<IUser | false>;
}
