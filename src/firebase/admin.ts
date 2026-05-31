import admin from "firebase-admin";
import fs from 'fs';
import path from 'path';
import { configDotenv } from "dotenv";

configDotenv();

const serviceAccountPath = path.join(
  process.cwd(),
  process.env.FIREBASE_ADMIN_FILE_PATH as string
);

if(!fs.existsSync(serviceAccountPath)){
  throw new Error(`Firebase service account file not found at ${serviceAccountPath}`);
}

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, 'utf-8')
);

if(!admin.apps.length){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  })
}

const auth = admin.auth();
const firestore = admin.firestore();
const storage = admin.storage().bucket();

export { admin, auth, firestore, storage };