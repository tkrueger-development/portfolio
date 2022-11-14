import os from 'os';
import fs from 'fs';
import path from 'path';

import { LogDevice } from '../types';

class FileTransporter implements LogDevice {
  private stream: fs.WriteStream;

  constructor({ location, fileName }: { location: string; fileName: string }) {
    const destination = path.resolve(path.join(location, fileName));

    this.stream = fs.createWriteStream(destination, 'utf-8');
  }

  async log({ message }: { message: string }): Promise<void> {
    this.stream.write(message + os.EOL);
  }

  async close(): Promise<void> {
    this.stream.close();
  }
}

export { FileTransporter };