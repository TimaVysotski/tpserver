import express, { Router } from "express";
import SignController from "../db/controllers/SignController";
import { STATUS_OK, STATUS_NOT_FOUND } from "../constants/api";

class SignRoutes {
    private controller: SignController;
    readonly router: express.Router;

    constructor() {
        this.controller = new SignController();
        this.router = Router();
        this.initRoutes();
    }

    initRoutes(): void {
        this.router.post("/", ({ body }: express.Request, res: express.Response) => {
            this.controller.login(body)
                .then((user) => res.status(STATUS_OK).send(user))
                .catch(error => res.status(STATUS_NOT_FOUND).send(error));
        });
    }
};

export default new SignRoutes().router;
