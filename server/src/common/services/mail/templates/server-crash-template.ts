import { config } from '../../../config/config';
import { Mail } from '../types';

const serverCrashMail = ({ reason }: { reason: string }): Omit<Mail, 'from'> => {
  return {
    to: config.app.shopMail,
    subject: `Server crashed. Event: ${reason}`,
    html: '',
    text: ''
  };
};

export { serverCrashMail };