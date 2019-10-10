import express from "express";
import jwt from "jsonwebtoken";
import JWT_CONFIG from "../constants/jwtSecure";
import models from "../models/index";
import { IUser } from "../interfaces/user";
import { IToken } from "../interfaces/token";


class JwtMiddelware {
    getToken = (user: IUser) => {
        return jwt.sign({ id: user._id }, JWT_CONFIG.JWT_SECRET, JWT_CONFIG.JWT_OPTIONS)
    };
    checkHeaders = ({ headers }: express.Request) => {
        if (headers.authorization) {
            return headers.authorization.replace("Bearer ", "");
        } else {
            return "";
        }
    };
    checkToken = (token: IToken) => {
        return new Promise((resolve, reject) => {
            models.token.findOne({ token })
                .then(token => {
                    if(token){
                        resolve(token)
                    } else {
                        reject(null);
                    }
                })
                .catch(error => reject(error));
        });
    }
};

export default JwtMiddelware;
