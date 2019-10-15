import express, { Router } from "express";
import multer from "multer";
import UserController from "../db/controllers/UserController";
import LoginController from "../db/controllers/LoginController";
import { STATUS_OK, STATUS_NOT_FOUND } from "../constants/api";
import { IPassword } from "../interfaces/user";

class UserRoutes {
  private controller: UserController;
  private login: LoginController;
  private upload = multer({ dest: "uploads/" });
  readonly router: express.Router;

  constructor() {
    this.controller = new UserController();
    this.login = new LoginController();
    this.router = Router();
    this.initRoutes();
  };

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

    this.router.post("/", this.upload.single("picture"), (req: express.Request, res: express.Response) => {
      console.log(req.file);
      res.send("success");
    });

    this.router.put("/", ({ body }: express.Request, res: express.Response) => {
      this.controller.update(body)
        .then(user => res.status(STATUS_OK).send(user))
        .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });

    this.router.delete("/:id", (req: express.Request, res: express.Response) => {
      this.controller.delete(req.params.id)
        .then(() => res.status(STATUS_OK))
        .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });

    this.router.delete("/", (req: express.Request, res: express.Response) => {
      this.login.logout(req.body.currentUser.id)
        .then(user => res.status(STATUS_OK).send(user))
        .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });

    this.router.post("/password/change", ({ body }: express.Request, res: express.Response) => {
      this.controller.changePassword({
          password: body.password,
          newPassword: body.newPassword, 
          user: body.currentUser
      } as IPassword)
          .then(result => res.status(STATUS_OK).send(result))
          .catch(error => res.status(STATUS_NOT_FOUND).send(error));
  });
  };
};

export default new UserRoutes().router;
