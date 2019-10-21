import app from "./EpressAplication";
import connectDB from "./db/config";
import admin from "firebase-admin";

connectDB()
    .then(() => app.listen(process.env.PORT))
    .catch(console.log);


admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_CREDENTIALS!),
    storageBucket: process.env.STORAGE_URL!,
});

const bucket = admin.storage().bucket();

bucket.upload("src/db/services/uploads/qwe.jpg");
