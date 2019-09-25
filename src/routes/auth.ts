import express from "express";

import passport from "../libs/passport"
import { IUser } from "../models/user";

export const login = {
    post: async (req: express.Request, res: express.Response, next: () => void) => {
        await passport.authenticate('local',
            async (err: any, user: IUser, info: string) => {
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
                            res.send({ username: user.username, gender: user.gender, isAuthenticated: user.isAuthenticated});
                        }
                    });
                    // user.isAuthenticated = true;
                    // res.send({ username: user.username, gender: user.gender, isAuthenticated: user.isAuthenticated});
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
