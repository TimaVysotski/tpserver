import mongoose from "mongoose";

import user from "./user";
import post from "./post";

const connectDB = () => {
    const { DATABASE_URL } = process.env;
    if (!DATABASE_URL) {
        throw '123123123';
    }
    return mongoose.connect(DATABASE_URL);
    //return mongoose.connect(process.env.DATABASE_URL);
};

const models = { user, post };


export { connectDB };
export default models;
