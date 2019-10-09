import express, { Router } from "express";
import UserController from "../db/controllers/UserController";
import { STATUS_OK, STATUS_NOT_FOUND } from "../constants/api";
import BcryptMiddelware from "../middleware/bcrypt";

class UserRoutes {
  private controller: UserController;
  readonly router: express.Router;

  constructor() {
    this.controller = new UserController();
    this.router = Router();
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get("/", (req: express.Request, res: express.Response) => {
      this.controller.findAll()
        .then(users => res.status(STATUS_OK).send(users))
        .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });

    this.router.get("/:id", ({ params: { id } }: express.Request, res: express.Response) => {
      this.controller.findById(id)
        .then(user => res.status(STATUS_OK).send(user))
        .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });

    this.router.post("/", ({ body }: express.Request, res: express.Response) => {
          this.controller.create(body)
            .then(user => res.status(STATUS_OK).send(user))
            .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });

    this.router.put("/", ({ body }: express.Request, res: express.Response) => {
      this.controller.update(body)     //POINT
        .then(user => res.status(STATUS_OK).send(user))
        .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });

    this.router.delete("/:id", (req: express.Request, res: express.Response) => {
      this.controller.delete(req.params.id)
        .then(() => res.status(STATUS_OK))
        .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });
  };
};

export default new UserRoutes().router;
