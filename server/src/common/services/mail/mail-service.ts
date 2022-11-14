import { Mail, MultiMail, MailContact, MailProvider } from './types';

class MailService {
  private senderMail: string;
  private provider: MailProvider;

  constructor({ senderContact, provider }: { senderContact: MailContact, provider: MailProvider }) {
    this.senderMail = senderContact.mail;
    this.provider   = provider;
  }

  async sendSingleMail({ mail }: { mail: Omit<Mail, 'from'> }): Promise<boolean> {
    const fullMail: Mail = { 
      ...mail, 
      from: this.senderMail
    };

    const result = await this.provider.sendSingleMail({ mail: fullMail });

    return result;
  }

  async sendMultiMail({ mail }: { mail: Omit<MultiMail, 'from'> }): Promise<boolean> {
    const fullMail: MultiMail = {
      ...mail,
      from: this.senderMail
    };

    const result = await this.provider.sendMultiMail({ mail: fullMail });

    return result;
  }
}

export { MailService };