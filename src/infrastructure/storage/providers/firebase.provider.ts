import { configDotenv } from 'dotenv';
import { storage } from '@/firebase/admin';
import { StorageProvider } from '../interfaces/storage.interface';

configDotenv();

class FirebaseStorageProvider implements StorageProvider {
  private bucket = storage;

  async uploadFile(file: Buffer, path: string, mimeType: string): Promise<string> {
    const fileUpload = this.bucket.file(path);
    await fileUpload.save(file,{
        metadata:{
            contentType:mimeType
        }
    })

    await fileUpload.makePublic();
    const publicFilePath = `${process.env.PUBLIC_FILE_PATH_INITIAL}/${this.bucket.name}/${path}`;

    return publicFilePath
  }

  async deleteFile(path: string): Promise<void> {
      await this.bucket.file(path).delete();
  }
}

export default new FirebaseStorageProvider;
