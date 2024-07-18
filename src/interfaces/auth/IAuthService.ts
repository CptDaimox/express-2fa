/**
 * Represents the authentication service interface.
 */
export interface IAuthService {
  /**
   * Creates a token for the specified user email.
   * @param userMail The user email.
   * @returns A promise that resolves to the created token as a string, or `false` if the token creation fails.
   */
  createToken: (userMail: string) => Promise<string | false>;

  /**
   * Verifies the specified token.
   * @param token The token to verify.
   * @returns A promise that resolves to the verification result.
   */
  verifyToken: (token: string) => Promise<any>;
}
