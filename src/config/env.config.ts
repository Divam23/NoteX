import { cleanEnv, port, str } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: port(),
  MONGODB_URI: str(),

  FIREBASE_ADMIN_FILE_PATH: str(),
  FIREBASE_STORAGE_BUCKET: str(),

});