import { HttpException } from "@/middlewares/errorHandler";
import { IAuthService } from "@interfaces/auth/IAuthService";
import { IUserService } from "@interfaces/user";
import { Request, Response } from "express";

export class AuthController {
  private authService: IAuthService;
  private userService: IUserService;

  constructor(authService: IAuthService, userService: IUserService) {
    this.authService = authService;
    this.userService = userService;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.userService.findUserByCredentials(email, password);

    if (!user) throw new HttpException("Invalid email or password", 401);

    const token = await this.authService.createToken(user.email);
    if (!token) throw new HttpException("Login failed", 500);

    res.status(200).json({ token });
  }

  async register(req: Request, res: Response) {
    const { email, password, phone } = req.body;
    const user = await this.userService.findUserByEmail(email);

    if (user) throw new HttpException("User already exists", 401);

    const newUser = await this.userService.createUser(email, password, phone);
    if (!newUser) throw new HttpException("Register failed", 500);

    res.status(200).json({ email: newUser.email, phone: newUser.phone });
  }
}
