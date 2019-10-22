import mongoose, { Schema } from "mongoose";
import { IToken } from "../interfaces/token";
import { DATA_BASE } from "../constants/db";

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

TokenSchema.pre<IToken>(DATA_BASE.SAVE, function (next) {
    this.toJSON();
    next();
});

TokenSchema.methods.toJSON = function () {
    const token = this.toObject();
    token.id = token._id;
    delete token._id;
    delete token.__v;
    return token;
};

const token = mongoose.model<IToken>(DATA_BASE.TOKEN, TokenSchema);

export default token;
