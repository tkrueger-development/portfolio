interface MailCore {
  from: string;
  subject: string;
  html: string;
  text: string;
  cc?: string;
  bcc?: string;
}

interface Mail extends MailCore {
  to: string;
}

interface MultiMail extends MailCore  {
  to: Array<string>;
}

export { Mail, MultiMail };