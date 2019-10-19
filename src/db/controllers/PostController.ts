import models from "../../models/index";
import { IPost } from "../../interfaces/post";
import { DATA_BASE, USER } from "../../constants/db";

class PostController {
    findAll = async () => {
        try {
            const posts = await models.post.find().populate([USER]);
            return posts;
        } catch (error) {
            throw error;
        };
    };
    findById = async (id: string) => {
        try {
            const post = await models.post.findById(id).populate([USER]);
            return post;
        } catch (error) {
            throw error;
        };
    };
    create = async (post: IPost) => {
        try {
            const searchPost = await models.post.create(post);
            return searchPost;
        } catch (error) {
            throw error;
        };
    };
    update = async (text: string, id: string) => {
        try {
            const post = await models.post.update({ _id: id }, { text }, { new: true }).populate([USER]);
            return post;
        } catch (error) {
            throw error;
        };
    };
    delete = async (id: string) => {
        try {
            await models.post.findByIdAndRemove(id);
            return "true";
        } catch (error) {
            throw error;
        };
    };
};

export default PostController;
