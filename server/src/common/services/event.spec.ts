import { describe, it, expect, vi } from 'vitest';

import { Event } from './event';

enum TestEvents {
  TEST = 'test'
}

describe('Event', () => {
  describe('broadcast({ @eventName, @payload? })', () => {
    it('emits event @eventName and calls listeners with @payload', () => {
      const mockCallback     = vi.fn();
      const testEventEmitter = new Event<TestEvents>();

      testEventEmitter.subscribe({ event: TestEvents.TEST, callback: mockCallback });

      const payload = 'payload';

      testEventEmitter.broadcast<string>({ event: TestEvents.TEST , payload });

      expect(mockCallback).toHaveBeenCalledWith(payload);
    });
  });

  describe('querySubscribe({ eventName, @callback })', () => {
    it('subscribers immediatley receive the last broadcasted payload for event when registering', () => {
      const payload          = 'payload';
      const testEventEmitter = new Event<TestEvents>();
      
      testEventEmitter.broadcast<string>({ event: TestEvents.TEST, payload });
      
      const latestEvent = testEventEmitter.querySubscribe({ event: TestEvents.TEST, callback: () => 0 });
      
      expect(latestEvent).equals(payload);
    });
  });
});