import { Mail, MultiMail } from './mail';

interface MailProvider {
  sendSingleMail({ mail }: { mail: Mail }): Promise<boolean>;
  sendMultiMail({ mail }: { mail: MultiMail }): Promise<boolean>;
}

export { MailProvider };