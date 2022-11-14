import { describe, it, expect } from 'vitest';

import { Parser } from './parser';

describe('Parser', () => {
  it('exists', () => {
    expect(Parser).not.toBeUndefined();
  });

  describe('parse({ @injectData? })', () => {
    it('returns a string', () => {
      const template = '';
      const parseMap = {};

      const parser = new Parser({ template, parseMap });
      const result = parser.parse();

      expect(typeof result).equals('string');
    });

    it('replaces occurence of placeholder in a template', () => {
      const testMessage = 'test';
      const template = '{{MESSAGE}}';
      
      const parseMap = { 
        '{{MESSAGE}}': () => testMessage
      };

      const parser = new Parser({ template, parseMap });
      const result = parser.parse();

      expect(result).equals(testMessage);
    });

    it('replaces occurence of multiple placeholders in a template', () => {
      const testMessage1 = 'test1';
      const testMessage2 = 'test2';

      const template = '{{MESSAGE1}} {{MESSAGE2}}';

      const parseMap = { 
        '{{MESSAGE1}}': () => testMessage1,
        '{{MESSAGE2}}': () => testMessage2
      };

      const parser = new Parser({ template, parseMap });
      const result = parser.parse();

      const expectedMessage = `${testMessage1} ${testMessage2}`;

      expect(result).equals(expectedMessage);
    });

    it('does not replace when placeholder is not defined in parseMap', () => {
      const testMessage = 'test';
      const template    = '{{MESSAGE}} {{NOT_DEFINED}}';

      const parseMap = { 
        '{{MESSAGE}}': () => testMessage
      };

      const parser = new Parser({ template, parseMap });
      const result = parser.parse();

      const expectedMessage = `${testMessage} {{NOT_DEFINED}}`;

      expect(result).equals(expectedMessage);
    });

    it('@injectData extends @parseMap for current function invocation', () => {
      const testMessage = 'test';
      const template    = '{{MESSAGE}} {{INJECT_DATA}}';

      const parseMap = { 
        '{{MESSAGE}}': () => testMessage
      };

      const parser = new Parser({ template, parseMap });
      const result = parser.parse({ injectData: { '{{INJECT_DATA}}': () => 'injected' }});

      const expectedMessage = `${testMessage} injected`;

      expect(result).equals(expectedMessage);
    });
  });
});