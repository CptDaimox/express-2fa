import { extractBearerToken } from "@/common/utils";
import { IAuthService } from "@/interfaces/auth/IAuthService";
import { HttpException } from "./errorHandler";

export class AuthMiddleware {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
    this.authMiddleware = this.authMiddleware.bind(this);
  }

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
      throw new HttpException('Invalid token', 401);
    }
  }
}
