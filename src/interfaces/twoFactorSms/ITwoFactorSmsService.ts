/**
 * Represents a service for sending two-factor authentication codes via SMS.
 */
export interface ITwoFactorSmsService {
  /**
   * Sends a two-factor authentication code to the specified phone number.
   * @param phone - The phone number to send the code to.
   * @param twoFactorCode - The two-factor authentication code to send.
   * @returns A promise that resolves to a boolean indicating whether the code was sent successfully.
   */
  sendTwoFactorCode(phone: string, twoFactorCode: string): Promise<boolean>;
}
