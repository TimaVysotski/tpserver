import express from "express";
import passport from "../libs/passport/index"
import { IUser } from "../models/user";
import { IPost } from "../models/post";

export const login = {
    post: async (req: express.Request, res: express.Response, next: () => void) => {
        await passport.authenticate('local',
            async (err: any, user: IUser, post: IPost, info: string) => {
                console.log(user);
                if (err) {
                    throw err;
                }
                if (user) {
                    req.logIn(user, (error) => {
                        if (error) {
                            console.error("error = ", error);
                        } else {
                            user.isAuthenticated = true;
                            res.send({ username: user.username, gender: user.gender, isAuthenticated: user.isAuthenticated });
                        }
                    });
                } else {
                    res.status(401);
                    res.send(info);
                }
            })(req, res, next);
    },
};

export const logout = {
    post: async (req: express.Request, res: express.Response) => {
        req.logOut();
        res.send("Log Out is done!!!");
    }
}
