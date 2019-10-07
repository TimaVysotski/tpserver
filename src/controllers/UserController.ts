import express from "express";
import models from "../models/index";
import { UpdatedUserRequest } from "../interfaces/express";

class UserController {
    findAll = () => {
        const result = new Promise((resolve, reject) => {
            models.user.find()
                .then(users => resolve(users))
                .catch(error => reject(error));
        });
        return result;
    };
    findById = (id: string) => {
        const result = new Promise((resolve, reject) => {
            models.user.findById(id)
                .then(user => resolve(user))
                .catch(error => reject(error));
        });
        return result;
    };
    create = (body: UpdatedUserRequest) => {
        const result = new Promise((resolve, reject) => {
            models.user.create(body)
                .then(user => resolve(user))
                .catch(error => reject(error));
        });
        return result;
    };
    update = ({ body }: UpdatedUserRequest) => {
        const result = new Promise((resolve, reject) => {
            models.user.updateOne(body.id, body)    // POINT
                .then(user => resolve(user))
                .catch(error => reject(error));
        });
        return result;
    };
    delete = (id : string) => {
        const result = new Promise((resolve, reject) => {
            models.user.findByIdAndRemove(id)
            .then(() => resolve())
            .catch(error => reject(error));
        });
        return result;
    }
}
export default UserController;