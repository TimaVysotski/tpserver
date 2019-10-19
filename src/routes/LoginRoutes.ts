import express, { Router } from "express";
import SignController from "../db/controllers/LoginController";
import { STATUS_OK, STATUS_NOT_FOUND } from "../constants/api";

class SignRoutes {
    private controller: SignController;
    readonly router: express.Router;

    constructor() {
        this.controller = new SignController();
        this.router = Router();
        this.initRoutes();
    };

    initRoutes(): void {
        this.router.post("/", async ({ body }: express.Request, res: express.Response) => {
            try {
                const token = await this.controller.login(body);
                res.status(STATUS_OK).send(token);
            } catch (error) {
                res.status(STATUS_NOT_FOUND).send(error);
            };
        });
    };
};

export default new SignRoutes().router;
