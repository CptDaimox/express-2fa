export type IUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  twoFactorCode?: string;
  twoFactorExpiry?: Date;
};

export type IUserUpdate = Pick<Partial<IUser>, "name" | "email" | "twoFactorCode" | "twoFactorExpiry" | "password">;

/**
 * Represents a user repository.
 */
export interface IUserRepository {
  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of IUser objects if successful, or false otherwise.
   */
  findAllUsers(): Promise<IUser[] | false>;

  /**
   * Retrieves a user by email.
   * @param email - The email of the user to retrieve.
   * @returns A promise that resolves to an IUser object if found, or false otherwise.
   */
  findByEmail(email: string): Promise<IUser | false>;

  /**
   * Retrieves a user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to an IUser object if found, or false otherwise.
   */
  findById(id: string): Promise<IUser | false>;

  /**
   * Creates a new user.
   * @param email - The email of the user to create.
   * @param password - The password of the user to create.
   * @param phone - The phone number of the user to create.
   * @returns A promise that resolves to an IUser object if successful, or false otherwise.
   */
  createUser(email: string, password: string, phone: string): Promise<IUser | false>;

  /**
   * Updates a user.
   * @param userId - The ID of the user to update.
   * @param updateFields - The fields to update.
   * @returns A promise that resolves to an IUser object if successful, or false otherwise.
   */
  updateUser(userId: string, updateFields: IUserUpdate): Promise<IUser | false>;
}
