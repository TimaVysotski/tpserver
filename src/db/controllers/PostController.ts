import express from "express";
import models from "../../models/index";
import { UpdatedPostRequest } from "../../interfaces/express";
import { IPost } from "../../interfaces/post";

class PostController {
    findAll = () => {
        return new Promise((resolve, reject) => {
            models.post.find()
                .then(posts => resolve(posts))
                .catch(error => reject(error));
        });
    };
    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            models.post.findById(id)
                .then(post => resolve(post))
                .catch(error => reject(error));
        });
    };
    create = (post: IPost) => {
        return new Promise((resolve, reject) => {
            models.post.create(post)
                .then(post => resolve(post))
                .catch(error => reject(error));
        });
    };
    update = ({ body }: UpdatedPostRequest) => {
        return new Promise((resolve, reject) => {
            models.post.updateOne(body.id, body)    // POINT
                .then(post => resolve(post))
                .catch(error => reject(error));
        });
    };
    delete = (id: string) => {
        return new Promise((resolve, reject) => {
            models.post.findByIdAndRemove(id)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }
}

export default PostController;
