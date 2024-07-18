import { IUserService } from "@interfaces/user";
import "express-async-errors";

import { HttpException } from "@middlewares/errorHandler";
import { NextFunction, Request, Response } from "express";

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
    this.getUserById = this.getUserById.bind(this);
    this.getUserByEmail = this.getUserByEmail.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    if (!req.params.id) throw new HttpException("User ID not provided", 400);
    const user = await this.userService.findUserById(req.params.id);

    if (!user) throw new HttpException("User not found", 404);

    res.status(200).json(user);
  }

  async getUserByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email = req.query.email as string;
    if (!email) return next();
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new HttpException("User not found", 404);

    res.status(200).json({ _id: user._id, email: user.email, name: user.name, phone: user.phone });
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.findAllUsers();
    if (!users) throw new HttpException("No users found", 404);
    res.status(200).json(users);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    throw new HttpException("Method not implemented", 501);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    throw new HttpException("Method not implemented", 501);
  }
}
