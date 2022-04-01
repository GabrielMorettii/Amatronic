import upload from '@config/upload';
import fs from 'fs';
import { resolve } from 'path';

import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    let filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    if(process.env.NODE_ENV){
      filename = resolve(`${upload.tmpFolder}`, file);
    }

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
