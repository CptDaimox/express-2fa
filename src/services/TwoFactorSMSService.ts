import { ITwoFactorSmsService } from "@interfaces/twoFactorSms";
import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

/**
 * TwilioService class implements the ITwoFactorSmsService interface and provides functionality
 * to send two-factor authentication codes via SMS using the Twilio API.
 */
export class TwilioService implements ITwoFactorSmsService {
  private isConfigInvalid: boolean;
  private client: Twilio;

  /**
   * Constructs a new instance of the TwilioService class.
   */
  constructor() {
    this.isConfigInvalid = !accountSid || !authToken || !twilioNumber;
    this.client = new Twilio(accountSid, authToken);

    this.sendTwoFactorCode = this.sendTwoFactorCode.bind(this);
  }

  /**
   * Sends a two-factor authentication code to the specified phone number.
   * @param phone The phone number to send the code to.
   * @param twoFactorCode The two-factor authentication code.
   * @returns A promise that resolves to a boolean indicating whether the code was sent successfully.
   */
  async sendTwoFactorCode(phone: string, twoFactorCode: string): Promise<boolean> {
    try {
      if (this.isConfigInvalid) return false;
      const message = await this.client.messages.create({
        body: `Your 2FA code is: ${twoFactorCode}`,
        from: twilioNumber,
        to: phone,
      });

      if (message.status === "failed" || message.status === "undelivered") return false;

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
