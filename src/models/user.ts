import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user";
import BcryptMiddelware from "../middleware/bcrypt";
import DATA_BASE from "../constants/db";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    picture: {
        type: String,
    },
    gender: {
        type: String,
    },
});

UserSchema.pre<IUser>(DATA_BASE.SAVE, function (next) {
    BcryptMiddelware.createHash(this.password!)
        .then(password => {
            this.password = password;
            this.toJSON();
            next();
        })
        .catch(error => next(error));
});

UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

const user = mongoose.model<IUser>(DATA_BASE.USER, UserSchema);

export default user;
