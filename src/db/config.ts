import mongoose from "mongoose";

const connectDB = () => {
    return mongoose.connect(process.env.DATABASE_URL!);
};

export default connectDB ;
