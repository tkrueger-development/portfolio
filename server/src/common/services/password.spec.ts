import { describe, it, expect, beforeAll } from 'vitest';

import { Password } from './password';

describe('Password', () => {
  let hashResult:     string;
  let hashedPassword: string;

  const plainTextPassword = 'testPassword';
  
  beforeAll(async () => {
    hashResult     = await Password.hash({ password: plainTextPassword });
    hashedPassword = hashResult.split('.')[0];
  });

  describe('! ~hash({ @password })', () => {
    
    it('returns a string', () => {
      expect(typeof hashResult).equals('string');
    });

    it('consists of two substrings connected by dot', () => {
      expect(hashResult.split('.').length).equals(2);
    });

    it('hashed password is not the plain text password', () => {
      expect(hashedPassword).not.equals(plainTextPassword);
    });

    it('hashed password length is greater or equal than the plain text password', () => {
      const lengthOfHashedPassword    = hashedPassword.length;
      const lengthOfPlainTextPassword = plainTextPassword.length;

      const result = lengthOfHashedPassword >= lengthOfPlainTextPassword;

      expect(result).toBeTruthy();
    });

    it('result is not deterministic across multiple invocations', async () => {
      const hashResult2     = await Password.hash({ password: plainTextPassword });
      const hashedPassword2 = hashResult2.split('.')[0];

      expect(hashedPassword).not.equals(hashedPassword2);
    });

  });

  describe('! ~compare({ @suppliedPassword, @storedPassword })', () => {
    it('returns a boolean', async () => {
      const result = await Password.compare({ suppliedPassword: plainTextPassword, storedPassword: hashResult });

      expect(typeof result).equals('boolean');
    });

    it('returns true when hash result of @suppliedPassword matches @storedPassword', async () => {
      const result = await Password.compare({ suppliedPassword: plainTextPassword, storedPassword: hashResult });

      expect(result).equals(true);
    });

    it('returns false when hash result of @suppliedPassword does not match @storedPassword', async () => {
      const result = await Password.compare({ suppliedPassword: 'invalidPassword', storedPassword: hashResult });

      expect(result).equals(false);
    });
  });

});