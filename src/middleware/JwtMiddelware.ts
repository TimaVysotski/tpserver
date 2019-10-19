import express from "express";
import jwt from "jsonwebtoken";
import JWT_CONFIG from "../constants/jwtSecure";
import models from "../models/index";
import { IUser } from "../interfaces/user";
import { IToken } from "../interfaces/token";
import { USER } from "../constants/db";

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
    checkToken = async (token: IToken): Promise<IToken> => {
        try {
            const userToken = await models.token.findOne({ token: token.token }).populate(USER);
            if (userToken) {
                return userToken;
            } else {
                throw null;
            };
        } catch (error) {
            throw error;
        };
    };
};

export default JwtMiddelware;
