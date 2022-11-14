import { config } from '../config/config';
import { MailService } from './mail/mail-service';
import { SendGridProvider } from './mail/provider/sendgrid-provider';

const provider = new SendGridProvider({ apikey: config.sendgrid.apiKey });

const senderContact = { name: config.app.shopName, mail: config.app.shopMail };
const mailService   = new MailService({ senderContact, provider });

export { mailService };