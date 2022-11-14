import EventEmitter from 'events';

enum AppEvents {
  MONGODB_CONNECTED    = 'mongodb/connected',
  MONGODB_DISCONNECTED = 'mongodb/disconnected',
}

class Event<E extends string> {
  private emitter = new EventEmitter();
  private store: Record<string, unknown> = {};

  broadcast<T>({ event, payload }: { event: E, payload?: T }): void {
    this.store[event] = payload;

    this.emitter.emit(event, payload);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  querySubscribe<T>({ event, callback }: { event: E, callback: (payload: any) => any }): T | null {
    this.emitter.on(event, callback);

    const queryPayload = this.store[event] as T;

    if (!queryPayload) return null;

    return queryPayload;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe({ event, callback }: { event: E, callback: (payload: any) => any }): void {
    this.emitter.on(event, callback);
  }
}

const appEvent = new Event<AppEvents>();

export { appEvent, Event, AppEvents };