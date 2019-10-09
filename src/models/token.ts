import mongoose, { Schema } from "mongoose";
import { IToken } from "../interfaces/token";
import DATA_BASE from "../constants/db";

const TokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: DATA_BASE.USER,
    },
    token: {
        type: String,
        required: true,
    },
});

const token = mongoose.model<IToken>(DATA_BASE.TOKEN, TokenSchema);

export default token;
