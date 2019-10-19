import express, { Router } from "express";
import UserController from "../db/controllers/UserController";
import LoginController from "../db/controllers/LoginController";
import { STATUS_OK, STATUS_NOT_FOUND } from "../constants/api";
import { IPassword } from "../interfaces/user";
import MulterService from "../db/services/MulterService";


class UserRoutes {
  private controller: UserController;
  private login: LoginController;
  private multer: MulterService;
  readonly router: express.Router;

  constructor() {
    this.controller = new UserController();
    this.login = new LoginController();
    this.multer = new MulterService();
    this.router = Router();
    this.initRoutes();
  };

  public initRoutes(): void {
    this.router.get("/", async (req: express.Request, res: express.Response) => {
      try {
        const users = await this.controller.findAll();
        res.status(STATUS_OK).send(users);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.get("/:id", async ({ params: { id } }: express.Request, res: express.Response) => {
      try {
        const user = await this.controller.findById(id);
        res.status(STATUS_OK).send(user);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.post("/picture", this.multer.upload.single("picture"), async ({ body, file }: express.Request, res: express.Response) => {
      try {
        res.send("success");
      } catch (error) {
        res.send(error)
      }
    });

    this.router.put("/", async ({ body }: express.Request, res: express.Response) => {
      try {
        const user = await this.controller.update(body);
        res.status(STATUS_OK).send(user);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.delete("/:id", async (req: express.Request, res: express.Response) => {
      try {
        await this.controller.delete(req.params.id);
        res.status(STATUS_OK)
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.delete("/", async (req: express.Request, res: express.Response) => {
      try {
        const user = await this.login.logout(req.body.currentUser.id);
        res.status(STATUS_OK).send(user);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.post("/password/change", async ({ body }: express.Request, res: express.Response) => {
      try {
        const result = await this.controller.changePassword({
          password: body.password,
          newPassword: body.newPassword,
          user: body.currentUser
        } as IPassword);
        res.status(STATUS_OK).send(result);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });
  };
};

export default new UserRoutes().router;
