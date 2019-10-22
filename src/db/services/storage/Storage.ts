import admin, { ServiceAccount } from "firebase-admin";
import { Bucket, UploadResponse } from "@google-cloud/storage";
import { config, bucketURL } from "../../../../storageConfig";

class Storage {
  private static bucket: Bucket;

  static getInstane() {
    if (!this.bucket) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert(config as ServiceAccount),
          storageBucket: bucketURL,
        });
        this.bucket = admin.storage().bucket();
      } catch (error) {
        console.log(error);
      }
      return this.bucket;
    }
    return this.bucket;
  };

  static async upload(path: string): Promise<UploadResponse> {
    if (!this.bucket) {
      this.getInstane();
    }

    const result = await this.bucket.upload(path);
    return result;
  }
};

export default Storage;
