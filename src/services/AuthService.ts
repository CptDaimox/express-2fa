import { config, jwtConfig } from "@/common/config";
import { hash } from "@/common/utils";
import { IAuthService } from "@/interfaces/auth";
import * as jose from "jose";

export class AuthService implements IAuthService {
  constructor() {
    this.createToken = this.createToken.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
  }

  /**
   * Creates an Access Token
   *
   * @param payload AccessPayload or TokenPayload
   * @param userMail Email of the user
   * @param refresh Boolean If the token should be a refresh token
   * @returns The JSON Web Token
   */
  async createToken(userMail: string) {
    try {
      const secret = new TextEncoder().encode(config?.jwtSecret);

      const jwt = await new jose.SignJWT()
        .setProtectedHeader(jwtConfig.header)
        .setIssuedAt()
        .setIssuer(jwtConfig.iss)
        .setAudience(jwtConfig.aud)
        .setSubject(userMail)
        .setExpirationTime(jwtConfig.exp)
        .sign(secret);

      return jwt;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Verifies the token
   *
   * @param token - The token to be verified
   * @return An object containing the payload and protected header upon successful verification
   */
  async verifyToken(token: string) {
    const secret = new TextEncoder().encode(config?.jwtSecret);
    const decodedJwt = await jose.jwtVerify(token, secret, {
      issuer: jwtConfig.iss,
      audience: jwtConfig.aud,
    });

    return decodedJwt;
  }
}
