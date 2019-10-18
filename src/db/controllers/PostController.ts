import models from "../../models/index";
import { IPost } from "../../interfaces/post";
import { DATA_BASE, USER } from "../../constants/db";

class PostController {
    findAll = () => {
        return new Promise((resolve, reject) => {
            models.post.find().populate([USER])
                .then(posts => resolve(posts))
                .catch(error => reject(error));
        });
    };
    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            models.post.findById(id).populate([USER])
                .then(post => {
                    console.log(post);
                    resolve(post)
                })
                .catch(error => reject(error));
        });
    };
    create = (post: IPost) => {
        return new Promise((resolve, reject) => {
            models.post.create(post)
                .then(res => resolve(res))
                .catch(error => reject(error));
        });
    };
    update = (text: string, id: string) => {
        return new Promise((resolve, reject) => {
            models.post.update({ _id: id }, { text }, { new: true }).populate([USER])
                .then(post => resolve(post))
                .catch(error => reject(error));
        });
    };
    delete = (id: string) => {
        return new Promise((resolve, reject) => {
            models.post.findByIdAndRemove(id)
                .then(() => resolve("true"))
                .catch(error => reject(error));
        });
    };
};

export default PostController;
