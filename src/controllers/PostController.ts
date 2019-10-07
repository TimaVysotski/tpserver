import express from "express";
import models from "../models/index";
import { UpdatedPostRequest } from "../interfaces/express";

class PostController {
    findAll = () => {
        const result = new Promise((resolve, reject) => {
            models.post.find()
                .then(posts => resolve(posts))
                .catch(error => reject(error));
        });
        return result;
    };
    findById = (id: string) => {
        const result = new Promise((resolve, reject) => {
            models.post.findById(id)
                .then(post => resolve(post))
                .catch(error => reject(error));
        });
        return result;
    };
    create = (body: UpdatedPostRequest) => {
        const result = new Promise((resolve, reject) => {
            models.post.create(body)
                .then(post => resolve(post))
                .catch(error => reject(error));
        });
        return result;
    };
    update = ({ body }: UpdatedPostRequest) => {
        const result = new Promise((resolve, reject) => {
            models.post.updateOne(body.id, body)    // POINT
                .then(post => resolve(post))
                .catch(error => reject(error));
        });
        return result;
    };
    delete = (id : string) => {
        const result = new Promise((resolve, reject) => {
            models.post.findByIdAndRemove(id)
            .then(() => resolve())
            .catch(error => reject(error));
        });
        return result;
    }
}

export default PostController;
