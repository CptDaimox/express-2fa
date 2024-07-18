import { twoFactorExpiration } from "@common/config";
import { IAuthService } from "@interfaces/auth/IAuthService";
import { ITwoFactorSmsService } from "@interfaces/twoFactorSms";
import { IUser, IUserService } from "@interfaces/user";
import { HttpException } from "@middlewares/errorHandler";
import crypto from "crypto";
import { Request, Response } from "express";

/**
 * Controller for handling authentication-related requests.
 */
export class AuthController {
  private authService: IAuthService;
  private userService: IUserService;
  private twoFactorSmsService: ITwoFactorSmsService;

  /**
   * Constructs an instance of AuthController.
   * @param authService - The authentication service.
   * @param userService - The user service.
   * @param twoFactorSmsService - The two-factor SMS service.
   */
  constructor(authService: IAuthService, userService: IUserService, twoFactorSmsService: ITwoFactorSmsService) {
    this.authService = authService;
    this.userService = userService;
    this.twoFactorSmsService = twoFactorSmsService;

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.verifyTwoFactorCode = this.verifyTwoFactorCode.bind(this);
    this.requestPasswordChange = this.requestPasswordChange.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.setTwoFactorCode = this.setTwoFactorCode.bind(this);
    this.sendTwoFactorCode = this.sendTwoFactorCode.bind(this);
  }

  /**
   * Handles the login request.
   * @param req - The request object.
   * @param res - The response object.
   */
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.userService.findUserByCredentials(email, password);
    if (!user) throw new HttpException("Invalid email or password", 401);

    const code = await this.setTwoFactorCode(user);
    if (!code) throw new HttpException("Login failed", 500);

    await this.sendTwoFactorCode(user.phone, code);

    res.status(200).json({ message: "Two-factor authentication code sent" });
  }

  /**
   * Handles the register request.
   * @param req - The request object.
   * @param res - The response object.
   */
  async register(req: Request, res: Response) {
    const { email, password, phone } = req.body;
    const user = await this.userService.findUserByEmail(email);

    if (user) throw new HttpException("User already exists", 401);

    const newUser = await this.userService.createUser(email, password, phone);
    if (!newUser) throw new HttpException("Register failed", 500);

    res.status(200).json({ email: newUser.email, phone: newUser.phone });
  }

  /**
   * Handles the verification of the two-factor authentication code.
   * @param req - The request object.
   * @param res - The response object.
   */
  async verifyTwoFactorCode(req: Request, res: Response) {
    const { email, code } = req.body;

    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new HttpException("User not found", 404);

    if (user.twoFactorCode !== `${code}`) throw new HttpException("Invalid code", 401);
    if (user.twoFactorExpiry && user.twoFactorExpiry < new Date()) throw new HttpException("Code expired", 401);

    const token = await this.authService.createToken(user._id);
    if (!token) throw new HttpException("Login failed", 500);

    await this.userService.updateUser(user._id, {
      twoFactorCode: undefined,
      twoFactorExpiry: undefined,
    });

    res.status(200).json({ token });
  }

  async requestPasswordChange(req: Request, res: Response) {
    const userId = res.locals.decodedJWT.sub;

    const user = await this.userService.findUserById(userId);
    if (!user) throw new HttpException("User not found", 404);

    const code = await this.setTwoFactorCode(user);
    if (!code) throw new HttpException("Login failed", 500);

    this.sendTwoFactorCode(user.phone, code);

    res.status(200).json({ message: "Two-factor authentication code sent" });
  }

  async changePassword(req: Request, res: Response) {
    const userId = res.locals.decodedJWT.sub;
    const { password, code } = req.body;

    const user = await this.userService.findUserById(userId);
    if (!user) throw new HttpException("User not found", 404);
    if (user.twoFactorCode !== `${code}`) throw new HttpException("Invalid code", 401);
    if (user.twoFactorExpiry && user.twoFactorExpiry < new Date()) throw new HttpException("Code expired", 401);

    const isPasswordChanged = await this.userService.changePassword(userId, password);
    if (!isPasswordChanged) throw new HttpException("Login failed", 500);

    res.status(200).json({ message: "Password changed" });
  }

  private async setTwoFactorCode(user: IUser): Promise<string | false> {
    const code = crypto.randomInt(100000, 999999).toString();

    const updatedUser = await this.userService.updateUser(user._id, {
      twoFactorCode: code,
      twoFactorExpiry: new Date(Date.now() + twoFactorExpiration),
    });

    return code;
  }

  private async sendTwoFactorCode(phone: string, twoFactorCode: string): Promise<void> {
    const isSent = await this.twoFactorSmsService.sendTwoFactorCode(phone, twoFactorCode);
    if (!isSent) throw new HttpException("Failed sending two-factor authentication code", 500);
  }
}
