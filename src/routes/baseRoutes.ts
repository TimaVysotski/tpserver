import express from "express";
import UserRoutes from "./userRoutes";
import {API_ROUTES} from "../constants/api";

const configurateRoutes = {
    init: (app: express.Application) => {
        app.use(API_ROUTES.USER_API, UserRoutes.post);
        app.use(API_ROUTES.USER_API, UserRoutes.put);
        app.use(API_ROUTES.USER_API, UserRoutes.delete);
        app.use(API_ROUTES.USER_API, UserRoutes.get);
    }
}

export default configurateRoutes;
