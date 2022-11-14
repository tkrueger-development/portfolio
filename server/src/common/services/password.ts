
import { promisify } from 'util';
import { scrypt, randomBytes } from 'crypto';

const scryptAsync = promisify(scrypt);

class Password {
  static async hash({ password }: { password: string }): Promise<string> {

    const salt     = randomBytes(24).toString('hex');
    const buffer   = await scryptAsync(password, salt, 64) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare({ suppliedPassword, storedPassword }: { suppliedPassword: string, storedPassword: string }): Promise<boolean> {
    
    const [hashedPassword, salt] = storedPassword.split('.');
    const buffer = await scryptAsync(suppliedPassword, salt, 64) as Buffer;

    return buffer.toString('hex') === hashedPassword;
  }
}

export { Password };