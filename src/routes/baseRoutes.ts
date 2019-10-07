import express from "express";
import UserRoutes from "./UserRoutes";
import PostRoutes from "./PostRoutes";
import { API_ROUTES } from "../constants/api";


const configurateRoutes = {
    init: (app: express.Application) => {
        app.use(API_ROUTES.USER_API, UserRoutes);
        app.use(API_ROUTES.POST_API, PostRoutes);
    }
}

export default configurateRoutes;
