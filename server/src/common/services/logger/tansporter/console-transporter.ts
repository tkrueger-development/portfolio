import { LogDevice } from '../types';

class ConsoleTransporter implements LogDevice {
  log({ message }: { message: string }): void {
    console.log(message);
  }
}

export { ConsoleTransporter };