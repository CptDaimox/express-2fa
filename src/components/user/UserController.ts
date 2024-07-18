import { IUserService } from "@interfaces/user";
import "express-async-errors";

import { HttpException } from "@middlewares/errorHandler";
import { NextFunction, Request, Response } from "express";

/**
 * Controller class for handling user-related operations.
 */
export class UserController {
  private userService: IUserService;

  /**
   * Constructs a new UserController instance.
   * @param userService The user service to be used for user operations.
   */
  constructor(userService: IUserService) {
    this.userService = userService;
    this.getUserById = this.getUserById.bind(this);
    this.getUserByEmail = this.getUserByEmail.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  /**
   * Retrieves a user by their ID.
   * @param req The request object.
   * @param res The response object.
   * @throws HttpException if the user ID is not provided or if the user is not found.
   */
  async getUserById(req: Request, res: Response): Promise<void> {
    if (!req.params.id) throw new HttpException("User ID not provided", 400);
    const user = await this.userService.findUserById(req.params.id);

    if (!user) throw new HttpException("User not found", 404);

    res.status(200).json(user);
  }

  /**
   * Retrieves a user by their email.
   * @param req The request object.
   * @param res The response object.
   * @param next The next function.
   * @throws HttpException if the user is not found.
   */
  async getUserByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email = req.query.email as string;
    if (!email) return next();
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new HttpException("User not found", 404);

    res.status(200).json({ _id: user._id, email: user.email, name: user.name, phone: user.phone });
  }

  /**
   * Retrieves all users.
   * @param req The request object.
   * @param res The response object.
   * @throws HttpException if no users are found.
   */
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.findAllUsers();
    if (!users) throw new HttpException("No users found", 404);
    res.status(200).json(users);
  }

  /**
   * Updates a user.
   * @param req The request object.
   * @param res The response object.
   * @throws HttpException indicating that the method is not implemented.
   */
  async updateUser(req: Request, res: Response): Promise<void> {
    throw new HttpException("Method not implemented", 501);
  }

  /**
   * Deletes a user.
   * @param req The request object.
   * @param res The response object.
   * @throws HttpException indicating that the method is not implemented.
   */
  async deleteUser(req: Request, res: Response): Promise<void> {
    throw new HttpException("Method not implemented", 501);
  }
}
