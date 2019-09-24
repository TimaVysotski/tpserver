import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    id: string;
    username: string;
    password: string;
}

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
});

UserSchema.statics.findByLogin = async function(username: string): Promise<IUser>  {
    const user = await this.findOne({
        username: username,
    });

    return user;
}

UserSchema.pre("remove", function(next): void {
    this.model('Post').deleteMany({user: this._id}, next);
});

const user = mongoose.model<IUser>('User', UserSchema);

export default user;