import mongoose, {Schema, Document} from "mongoose"; 

export interface IPost extends Document{
    id: string;
    text: string,
    postedBy: string,
}

const PostSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    postedBy: {
        type: String,
    }
})

const post = mongoose.model<IPost>('Post', PostSchema);

export default post;