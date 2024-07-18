import { ITwoFactorSmsService } from "@interfaces/twoFactorSms";
import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

export class TwilioService implements ITwoFactorSmsService {
  private isConfigInvalid: boolean;
  private client: Twilio;
  constructor() {
    this.isConfigInvalid = !accountSid || !authToken || !twilioNumber;
    this.client = new Twilio(accountSid, authToken);

    this.sendTwoFactorCode = this.sendTwoFactorCode.bind(this);
  }

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
