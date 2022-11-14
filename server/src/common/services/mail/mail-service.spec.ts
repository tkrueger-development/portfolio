import { describe, it, expect, vi } from 'vitest';

import { Mail, MultiMail } from './types';
import { MailService } from './mail-service';
 
describe('EmailService({ @sender, @provider })', () => {
  it('exists', () => {
    expect(MailService).not.toBeUndefined();
  });

  const senderContact = {
    mail: 'test@test.com',
    name: 'Test User'
  };

  const partialSingleMail: Omit<Mail, 'from'> = {
    to: 'test@email.com',
    subject: 'Test Subject',
    html: '<h3>Hello Email</h3>',
    text: 'Hello Email'
  };

  const partialMultiMail: Omit<MultiMail, 'from'> = {
    ...partialSingleMail,
    to: ['test1@email.com', 'test2@email.com'],
  };

  describe('~sendSingleMail({ @mail })', () => {
    it('returns true for a delivered mail', async () => {
      const provider = {
        sendSingleMail: vi.fn(async () => true),
        sendMultiMail: vi.fn(),
      };

      const mailService = new MailService({ senderContact, provider });
      const response    = await mailService.sendSingleMail({ mail: partialSingleMail });

      const fullMail: Mail = {
        ...partialSingleMail,
        from: senderContact.mail
      };

      expect(response).toBeTruthy();
      expect(provider.sendSingleMail).toHaveBeenCalledWith({ mail: fullMail });
    });

    it('returns false for a non delivered mail', async () => {
      const provider = {
        sendSingleMail: vi.fn(async () => false),
        sendMultiMail: vi.fn(),
      };

      const mailService = new MailService({ senderContact, provider });
      const response    = await mailService.sendSingleMail({ mail: partialSingleMail });

      const fullMail: Mail = {
        ...partialSingleMail,
        from: senderContact.mail
      };

      expect(response).toBeFalsy();
      expect(provider.sendSingleMail).toHaveBeenCalledWith({ mail: fullMail });
    });
  });

  describe('~sendMultiMail({ @mail })', () => {
    it('returns true for a delivered mail', async () => {
      const provider = {
        sendSingleMail: vi.fn(),
        sendMultiMail: vi.fn(async () => true),
      };

      const mailService = new MailService({ senderContact, provider });
      const response    = await mailService.sendMultiMail({ mail: partialMultiMail });

      const fullMail: MultiMail = {
        ...partialMultiMail,
        from: senderContact.mail
      };

      expect(response).toBeTruthy();
      expect(provider.sendMultiMail).toHaveBeenCalledWith({ mail: fullMail });
    });

    it('returns false for non delivered mails', async () => {
      const provider = {
        sendSingleMail: vi.fn(),
        sendMultiMail: vi.fn(async () => false),
      };

      const mailService = new MailService({ senderContact, provider });
      const response    = await mailService.sendMultiMail({ mail: partialMultiMail });

      const fullMail: MultiMail = {
        ...partialMultiMail,
        from: senderContact.mail
      };

      expect(response).toBeFalsy();
      expect(provider.sendMultiMail).toHaveBeenCalledWith({ mail: fullMail });
    });
  });
});