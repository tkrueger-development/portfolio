import { vi, describe, it, expect, beforeEach } from 'vitest';

import { Logger } from './logger';
import { LogLevel } from './types';
import { Parser } from './parser'; 

describe('Logger({ @parser, @targets })', () => {
  it('exists', () => {
    expect(Logger).not.toBeUndefined();
  });

  describe('info({ @message }), warn({ @message }), error({ @message }), debug({ @message })', () => {

    beforeEach(() => {
      Logger.logLevel = LogLevel.INFO;
    });


    it('all methods exist', () => {
      const parser = new Parser({ 
        template: '', 
        parseMap: {}
      });

      const mockTargets = [{ log: vi.fn() }];
      const logger = new Logger({ parser, targets: mockTargets });

      expect(logger.info).not.toBeUndefined();
      expect(logger.warn).not.toBeUndefined();
      expect(logger.error).not.toBeUndefined();
      expect(logger.debug).not.toBeUndefined();
    });

    it('does not inject @message if no "{{MESSAGE}}" placeholder is available', () => {
      const parser = new Parser({ 
        template: '', 
        parseMap: {}
      });
      
      const mockTarget = { log: vi.fn() };
      
      const logger = new Logger({ parser, targets: [mockTarget] });
      const testMessage = 'test';

      logger.info({ message: testMessage });
      expect(mockTarget.log).toHaveBeenCalledTimes(1);
      expect(mockTarget.log).toHaveBeenLastCalledWith({ message: '' });

      logger.warn({ message: testMessage });
      expect(mockTarget.log).toHaveBeenCalledTimes(2);
      expect(mockTarget.log).toHaveBeenLastCalledWith({ message: '' });

      logger.error({ message: testMessage });
      expect(mockTarget.log).toHaveBeenCalledTimes(3);
      expect(mockTarget.log).toHaveBeenLastCalledWith({ message: '' });

      logger.debug({ message: testMessage });
      expect(mockTarget.log).toHaveBeenCalledTimes(4);
      expect(mockTarget.log).toHaveBeenLastCalledWith({ message: '' });
    });

    it('does not inject the loglevel if no "{{LOGLEVEL}}" placeholder is available', () => {
      const parser = new Parser({ 
        template: '', 
        parseMap: {}
      });
      
      const mockTarget = { log: vi.fn() };
      
      const logger = new Logger({ parser, targets: [mockTarget] });
      const testMessage = 'test';

      logger.info({ message: testMessage });
      expect(mockTarget.log).toHaveBeenCalledTimes(1);
      expect(mockTarget.log).toHaveBeenLastCalledWith({ message: '' });

      logger.warn({ message: testMessage });
      expect(mockTarget.log).toHaveBeenCalledTimes(2);
      expect(mockTarget.log).toHaveBeenLastCalledWith({ message: '' });

      logger.error({ message: testMessage });
      expect(mockTarget.log).toHaveBeenCalledTimes(3);
      expect(mockTarget.log).toHaveBeenLastCalledWith({ message: '' });

      logger.debug({ message: testMessage });
      expect(mockTarget.log).toHaveBeenCalledTimes(4);
      expect(mockTarget.log).toHaveBeenLastCalledWith({ message: '' });
    });

    it('outputs @message to one given @target', () => {
      const parser = new Parser({ 
        template: '{{MESSAGE}}', 
        parseMap: {}
      });

      const testMessage = 'test';
      const mockTarget = { log: vi.fn() };

      const logger = new Logger({ parser, targets: [mockTarget] });

      logger.info({ message: testMessage });
      expect(mockTarget.log).toHaveBeenCalledTimes(1);
      expect(mockTarget.log).toHaveBeenCalledWith({ message: testMessage });

      logger.warn({ message: testMessage });
      expect(mockTarget.log).toHaveBeenCalledTimes(2);
      expect(mockTarget.log).toHaveBeenCalledWith({ message: testMessage });

      logger.error({ message: testMessage });
      expect(mockTarget.log).toHaveBeenCalledTimes(3);
      expect(mockTarget.log).toHaveBeenCalledWith({ message: testMessage });

      logger.debug({ message: testMessage });
      expect(mockTarget.log).toHaveBeenCalledTimes(4);
      expect(mockTarget.log).toHaveBeenCalledWith({ message: testMessage });
    });

    it('outputs @message to multiple @targets', () => {
      const parser = new Parser({ 
        template: '{{MESSAGE}}', 
        parseMap: {}
      });

      const testMessage = 'test';

      const mockTarget1 = { log: vi.fn() };
      const mockTarget2 = { log: vi.fn() };

      const logger = new Logger({ parser, targets: [mockTarget1, mockTarget2] });

      logger.info({ message: testMessage });
      expect(mockTarget1.log).toHaveBeenCalledTimes(1);
      expect(mockTarget1.log).toHaveBeenCalledWith({ message: testMessage });
      expect(mockTarget2.log).toHaveBeenCalledTimes(1);
      expect(mockTarget2.log).toHaveBeenCalledWith({ message: testMessage });

      logger.warn({ message: testMessage });
      expect(mockTarget1.log).toHaveBeenCalledTimes(2);
      expect(mockTarget1.log).toHaveBeenCalledWith({ message: testMessage });
      expect(mockTarget2.log).toHaveBeenCalledTimes(2);
      expect(mockTarget2.log).toHaveBeenCalledWith({ message: testMessage });

      logger.error({ message: testMessage });
      expect(mockTarget1.log).toHaveBeenCalledTimes(3);
      expect(mockTarget1.log).toHaveBeenCalledWith({ message: testMessage });
      expect(mockTarget2.log).toHaveBeenCalledTimes(3);
      expect(mockTarget2.log).toHaveBeenCalledWith({ message: testMessage });

      logger.debug({ message: testMessage });
      expect(mockTarget1.log).toHaveBeenCalledTimes(4);
      expect(mockTarget1.log).toHaveBeenCalledWith({ message: testMessage });
      expect(mockTarget2.log).toHaveBeenCalledTimes(4);
      expect(mockTarget2.log).toHaveBeenCalledWith({ message: testMessage });
    });

    it('does not forward @message to @target when loglevel priority is above INFO', () => {
      const levels = [LogLevel.WARNING, LogLevel.ERROR, LogLevel.DEBUG];

      const parser = new Parser({ 
        template: '{{MESSAGE}}', 
        parseMap: {}
      });
      
      for (const level of levels) {
        Logger.logLevel = level;
        
        const mockTarget = { log: vi.fn() };
        const logger     = new Logger({ parser, targets: [mockTarget] });

        const testMessage = 'test';
        logger.info({ message: testMessage });

        expect(mockTarget.log).not.toHaveBeenCalledOnce();
      }
    });

    it('does not forward @message to @target when loglevel priority is above WARNING', () => {
      const levels = [LogLevel.ERROR, LogLevel.DEBUG];

      const parser = new Parser({ 
        template: '{{MESSAGE}}', 
        parseMap: {}
      });
      
      for (const level of levels) {
        Logger.logLevel = level;
        
        const mockTarget = { log: vi.fn() };
        const logger     = new Logger({ parser, targets: [mockTarget] });

        const testMessage = 'test';
        logger.info({ message: testMessage });
        logger.warn({ message: testMessage });

        expect(mockTarget.log).not.toHaveBeenCalledOnce();
      }
    });

    it('does not forward @message to @target when loglevel priority is above DEBUG', () => {
      Logger.logLevel = LogLevel.DEBUG;

      const parser = new Parser({ 
        template: '{{MESSAGE}}', 
        parseMap: {}
      });

      const mockTarget = { log: vi.fn() };
      const logger     = new Logger({ parser, targets: [mockTarget] });

      const testMessage = 'test';
      logger.info({ message: testMessage });
      logger.warn({ message: testMessage });
      logger.error({ message: testMessage });

      expect(mockTarget.log).not.toHaveBeenCalledOnce();
    });

    it('replaces all defined placeholder occurrences', () => {
      const ID = Date.now().toString();

      const parser = new Parser({
        template: '[{{ID}}] [{{LOGLEVEL}}] [{{MESSAGE}}]',
        parseMap: { '{{ID}}': () => ID }
      });

      const mockTarget = { log: vi.fn() };
      const logger     = new Logger({ parser, targets: [mockTarget] });

      const testMessage = 'test';
      logger.info({ message: testMessage });
      
      const parsedMessage = `[${ID}] [INFO] [${testMessage}]`;
      expect(mockTarget.log).toHaveBeenCalledOnce();
      expect(mockTarget.log).toHaveBeenCalledWith({ message: parsedMessage });
    });
  });
});