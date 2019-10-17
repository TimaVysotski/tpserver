import admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_CREDENTIALS!),
    storageBucket: process.env.STORAGE_URL!,
});

const bucket = admin.storage().bucket();

export default bucket;
