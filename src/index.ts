import app from "./EpressAplication";
import connectDB from "./db/config";
import admin from "firebase-admin";

connectDB()
    .then(() => app.listen(process.env.PORT))
    .catch(console.log);
