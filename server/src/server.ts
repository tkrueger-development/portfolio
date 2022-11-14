import { config } from './common/config/config';

import http from 'http';
import { app } from './app';

import { MongoDB } from './common/database/mongodb';
import { mailService } from './common/services/mail-service';
import { serverCrashMail } from './common/services/mail/templates/server-crash-template';
import { appEvent, AppEvents } from './common/services/event';

import { logger } from './common/services/logger';

let mongodb: MongoDB;
const server = http.createServer(app);


const gracefulShutdown = ({ signal }: { signal: string }) => {
  logger.info({ message: `Server: Received signal '${signal}'. Shutting down..` });
  
  server.close(async () => {
    logger.info({ message: 'Server: Shut down.' });
    logger.info({ message: 'Database: Closing connection..' });

    await mongodb.disconnect();

    logger.info({ message: 'Database: Disconnected.' });
    process.exit(0);
  });
};


const emergencyNotification = ({ error, message }: { error: string, message: string }): void => {
  const reason = error + ': ' + message;

  logger.error({ message: `Server crashed. Reason: '${reason}.'` });
  
  if (process.env.NODE_ENV === 'production') {
    mailService.sendSingleMail({ mail: serverCrashMail({ reason }) });
  }

  process.exit(1);
};

const SIGNALS = ['SIGTERM', 'SIGINT', 'SIGHUP'];
const ERRORS  = ['uncaughtException', 'unhandledRejection'];
SIGNALS.forEach((signal) => process.on(signal, ()       => gracefulShutdown({ signal })));
ERRORS.forEach((error)   => process.on(error, (message) => emergencyNotification({ error, message })));

const main = async () => {
  appEvent.subscribe({ event: AppEvents.MONGODB_CONNECTED,    callback: () => logger.info({ message: 'MongoDB: Connected.' })});
  appEvent.subscribe({ event: AppEvents.MONGODB_DISCONNECTED, callback: () => logger.info({ message: 'MongoDB: Disconnected.' })});

  const { serverPort }       = config.server;
  const { mongoURI, dbName } = config.mongodb;

  mongodb = await MongoDB.createConnection({ mongoURI, dbName, eventEmitter: appEvent });

  server.listen(parseInt(serverPort));

  logger.info({ message: `Server: Listening on port ${serverPort}.` });
};

main();
