import { extractBearerToken } from "@/common/utils";
import { IAuthService } from "@/interfaces/auth/IAuthService";
import { HttpException } from "./errorHandler";

/**
 * Middleware for authentication.
 */
export class AuthMiddleware {
  private authService: IAuthService;

  /**
   * Constructs an instance of AuthMiddleware.
   * @param authService - The authentication service.
   */
  constructor(authService: IAuthService) {
    this.authService = authService;
    this.authMiddleware = this.authMiddleware.bind(this);
  }

  /**
   * Middleware function that verifies the authentication token.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function.
   */
  async authMiddleware(req: any, res: any, next: any) {
    try {
      const token = extractBearerToken(req.header("Authorization"));

      if (!token) return res.sendStatus(401);

      const decodedToken = await this.authService.verifyToken(token);
      if (!decodedToken) return res.sendStatus(401);
      res.locals.decodedJWT = decodedToken.payload;
      next();
    } catch (error) {
      console.error(error);
      throw new HttpException("Invalid token", 401);
    }
  }
}
