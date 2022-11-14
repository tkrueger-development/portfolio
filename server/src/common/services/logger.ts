import { Logger } from './logger/logger';
import { Parser } from './logger/parser';
import { ConsoleTransporter } from './logger/tansporter/console-transporter';
import { LogLevel } from './logger/types';

const parser = new Parser({
  template: '{{ID}} {{LOGLEVEL}} {{MESSAGE}}',
  parseMap: {
    '{{ID}}': () => Date.now().toString()
  }
});

const targets = [
  new ConsoleTransporter()
];

Logger.logLevel = LogLevel.INFO;
const logger = new Logger({ parser, targets });

export { logger };