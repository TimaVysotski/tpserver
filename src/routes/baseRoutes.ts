import express from "express";
import UserRoutes from "./userRoutes";
import PostRoutes from "./postRoutes";
import {API_ROUTES} from "../constants/api";

const configurateRoutes = {
    init: (app: express.Application) => {
        app.use(API_ROUTES.USER_API, UserRoutes.post);
        app.use(API_ROUTES.USER_API, UserRoutes.put);
        app.use(API_ROUTES.USER_API, UserRoutes.delete);
        app.use(API_ROUTES.USER_API, UserRoutes.get);

        app.use(API_ROUTES.POST_API, PostRoutes.post);
        app.use(API_ROUTES.POST_API, PostRoutes.put);
        app.use(API_ROUTES.POST_API, PostRoutes.delete);
        app.use(API_ROUTES.POST_API, PostRoutes.get);
    }
}

export default configurateRoutes;
