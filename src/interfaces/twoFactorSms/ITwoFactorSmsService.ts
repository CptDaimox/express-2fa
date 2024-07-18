export interface ITwoFactorSmsService {
  sendTwoFactorCode(phone: string, twoFactorCode: string): Promise<boolean>;
}
