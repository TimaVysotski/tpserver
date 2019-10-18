import admin from "./config";

admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_CREDENTIALS!),
    storageBucket: process.env.STORAGE_URL!,
});

class Storage {
    static bucket: any;
    public constructor() { };

    public static getBucket() {
        try{
            if (!Storage.bucket) {
                this.bucket = admin.storage().bucket();
            }
            return this.bucket;
        } catch (error) {
            console.log(error);
        };
    };
};

export default Storage;
