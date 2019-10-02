import mongoose from "mongoose";

import user from "./user";
import post from "./post";

const connectDB = () => {
    return mongoose.connect(process.env.DATABASE_URL as string);
};

const models = { user, post };


export { connectDB };
export default models;
