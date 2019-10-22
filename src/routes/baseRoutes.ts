import express from "express";
import JwtMiddelware from "../middleware/JwtMiddelware";
import SignRoutes from "./SignRoutes";
import LoginRoutes from "./LoginRoutes";
import UserRoutes from "./UserRoutes";
import PostRoutes from "./PostRoutes";
import { API_ROUTES, STATUS_NOT_FOUND } from "../constants/api";
import { IToken } from "../interfaces/token";

const jwt = new JwtMiddelware();

const configurateRoutes = {
    init: (app: express.Application) => {
        app.use("/api", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const token: String = jwt.checkHeaders(req);
                const userToken: IToken = await jwt.checkToken({ token } as IToken)
                req.body.currentUser = userToken.user;
                next();
            } catch (error) {
                res.status(STATUS_NOT_FOUND).send("U Must login!");
            };
        });
        app.use(API_ROUTES.REGISTRATION_API, SignRoutes);
        app.use(API_ROUTES.SIGN_API, LoginRoutes);
        app.use(API_ROUTES.USER_API, UserRoutes);
        app.use(API_ROUTES.POST_API, PostRoutes);
    },
};

export default configurateRoutes;
