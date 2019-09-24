"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const user_1 = __importDefault(require("./user"));
const post_1 = __importDefault(require("./post"));
const connectDB = () => {
    const { DATABASE_URL } = process.env;
    if (!DATABASE_URL) {
        throw '123123123';
    }
    return mongoose_1.default.connect(DATABASE_URL);
    //return mongoose.connect(process.env.DATABASE_URL);
};
exports.connectDB = connectDB;
const modelsS = { user: user_1.default, post: post_1.default };
exports.default = mongoose_1.models;
