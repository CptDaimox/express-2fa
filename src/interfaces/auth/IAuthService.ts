
export interface IAuthService {
  createToken: (userMail: string) => Promise<string | false>;
  verifyToken: (token: string) => Promise<any>;
}