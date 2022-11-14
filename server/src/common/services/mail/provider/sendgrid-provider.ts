import SendGrid from '@sendgrid/mail';
import { Mail, MailProvider, MultiMail } from '../types';

class SendGridProvider implements MailProvider {
  private SendGrid = SendGrid;

  constructor({ apikey }: { apikey: string }) {
    this.SendGrid.setApiKey(apikey);
  }

  async sendSingleMail({ mail }: { mail: Mail }): Promise<boolean> {
    try {
      await this.SendGrid.send(mail);
      return true;
    } 
    catch (ex: unknown) {
      return false;
    }
  }

  async sendMultiMail({ mail }: { mail: MultiMail }): Promise<boolean> {
    try {
      await this.SendGrid.sendMultiple(mail);
      return true;
    } 
    catch (ex: unknown) {
      return false;
    }
  }
}

export { SendGridProvider };