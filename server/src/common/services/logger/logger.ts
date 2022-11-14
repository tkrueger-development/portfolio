import { Parser } from './parser';
import { LogLevel, LogDevice } from './types';

class Logger {
  public static logLevel: LogLevel = LogLevel.INFO;

  private parser: Parser;
  private targets: Array<LogDevice>;

  constructor({ parser, targets }: { parser: Parser, targets: Array<LogDevice> }) {
    this.parser = parser;
    this.targets = [...targets];
  }

  private log({ message, loglevel }: { message: string, loglevel: LogLevel }): void {
    const injectData = { 
      '{{LOGLEVEL}}': () => LogLevel[loglevel].toString(),
      '{{MESSAGE}}': () => message
    };

    const parsedMessage = this.parser.parse({ injectData });

    this.targets.forEach((target) => target.log({ message: parsedMessage }));
  }

  public info({ message }: { message: string }): void {
    if (Logger.logLevel > LogLevel.INFO) return;

    this.log({ message, loglevel: LogLevel.INFO });
  }

  public warn({ message }: { message: string }): void {
    if (Logger.logLevel > LogLevel.WARNING) return;

    this.log({ message, loglevel: LogLevel.WARNING });
  }

  public error({ message }: { message: string }): void {
    if (Logger.logLevel > LogLevel.ERROR) return;

    this.log({ message, loglevel: LogLevel.ERROR });
  }

  public debug({ message }: { message: string }): void {
    if (Logger.logLevel > LogLevel.DEBUG) return;

    this.log({ message, loglevel: LogLevel.DEBUG });
  }

}

export { Logger };