import jwt from 'jsonwebtoken';
import { config } from '../config/config';

enum TokenCategory {
  LOGIN        = 'login',
  RESET        = 'reset',
  ACTIVATION   = 'activation',
}

type TokenConfig  = Record<TokenCategory, Record<'secret' | 'expire', string>>;

class Token { 
  private static config: TokenConfig = {
    login: {
      secret:    config.token.loginSecret,
      expire:    config.token.loginExpire,
    },

    reset: {
      secret:    config.token.resetSecret,
      expire:    config.token.resetExpire,
    },

    activation: {
      secret:    config.token.activationSecret,
      expire:    config.token.activationExpire
    },
  };

  static create({ payload, category }: { payload: object, category: TokenCategory }): string {
    const { secret, expire } = Token.config[category];

    return jwt.sign(payload, secret, { expiresIn: expire });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static check({ token, category }: { token: string, category: TokenCategory }): Record<string, any> | null {
    const { secret } = Token.config[category];

    try {
      const decoded = jwt.verify(token, secret);
      return decoded as Record<string, string>;
    }
    catch (ex: unknown) {
      return null;
    }
  }
}

export { Token, TokenCategory };