process.env.TOKEN_LOGIN_EXPIRE        = '1000';
process.env.TOKEN_RESET_EXPIRE        = '1000';
process.env.TOKEN_ACTIVATION_EXPIRE   = '1000';
process.env.TOKEN_LOGIN_SECRET        = 'fb0a71e1ff0bbf3354186d81c9b38f1e0828db8eed993cf32bddf91bf4de1969';
process.env.TOKEN_RESET_SECRET        = '6064d534f081ddf69d3c9ef86411f50a28117d489779c3e0b6fdafdb80e48f03';
process.env.TOKEN_ACTIVATION_SECRET   = '1c732df3aa62098cfad02df910145c9ca928f1ee77d345f3a5ffadd74af31ad9';

import { describe, it, expect } from 'vitest';
import { Token, TokenCategory } from './token';

describe('Token', () => {
  const payload           = { test: 'test' };

  const loginToken        = Token.create({ payload, category: TokenCategory.LOGIN });
  const resetToken        = Token.create({ payload, category: TokenCategory.RESET });
  const activationToken   = Token.create({ payload, category: TokenCategory.ACTIVATION });

  describe('! create({ @payload, @category }) and ! check({ @payload, @category })', () => {
    describe('tokens do not verfiy with another type', () => {

      const testCases = [
        { token: loginToken,      category: TokenCategory.LOGIN,      testAgainstCategory: TokenCategory.LOGIN,        expected: true },
        { token: loginToken,      category: TokenCategory.LOGIN,      testAgainstCategory: TokenCategory.RESET,        expected: false },
        { token: loginToken,      category: TokenCategory.LOGIN,      testAgainstCategory: TokenCategory.ACTIVATION,   expected: false },

        { token: resetToken,      category: TokenCategory.RESET,      testAgainstCategory: TokenCategory.RESET,        expected: true },
        { token: resetToken,      category: TokenCategory.RESET,      testAgainstCategory: TokenCategory.LOGIN,        expected: false },
        { token: resetToken,      category: TokenCategory.RESET,      testAgainstCategory: TokenCategory.ACTIVATION,   expected: false },

        { token: activationToken, category: TokenCategory.ACTIVATION, testAgainstCategory: TokenCategory.ACTIVATION,   expected: true },
        { token: activationToken, category: TokenCategory.ACTIVATION, testAgainstCategory: TokenCategory.LOGIN,        expected: false },
        { token: activationToken, category: TokenCategory.ACTIVATION, testAgainstCategory: TokenCategory.RESET,        expected: false }
      ];

      testCases.forEach((testCase) => {
        const { token, category, testAgainstCategory, expected } = testCase;

        const verifies = category === testAgainstCategory ? 'verifies' : 'does not verify';

        it (`${category} token ${verifies} with token category ${testAgainstCategory}`, () => {
          const result = Token.check({ token, category: testAgainstCategory });

          expect(Boolean(result)).equals(expected);
        });
      });
    });

  });
});