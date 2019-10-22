import { Router, Response, Request } from "express";
import UserController from "../db/controllers/UserController";
import LoginController from "../db/controllers/LoginController";
import { STATUS_OK, STATUS_NOT_FOUND } from "../constants/api";
import { IPassword } from "../interfaces/user";
import MulterService from "../db/services/MulterService";
import Storage from "../db/services/storage/Storage";
import { MULTER } from "../constants/db";

class UserRoutes {
  private controller: UserController;
  private login: LoginController;
  private multer: MulterService;
  readonly router: Router;

  constructor() {
    this.controller = new UserController();
    this.login = new LoginController();
    this.multer = new MulterService();
    this.router = Router();
    this.initRoutes();
  };

  public initRoutes(): void {
    this.router.get("/", async (req: Request, res: Response) => {
      try {
        const users = await this.controller.findAll();
        res.status(STATUS_OK).send(users);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.get("/:id", async ({ params: { id } }: Request, res: Response) => {
      try {
        const user = await this.controller.findById(id);
        res.status(STATUS_OK).send(user);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.post("/upload", async (req: Request, res: Response) => {
      try {
        await this.multer.upload(req, res, (error) => {
          if (error) {
            res.status(STATUS_NOT_FOUND).send(error)
          };
          Storage.upload(MULTER.UPLOADS_URL + req.file.originalname);
          res.status(STATUS_OK).send();
        });
      } catch (error) {
        res.send(error)
      }
    });

    this.router.put("/", async ({ body }: Request, res: Response) => {
      try {
        const user = await this.controller.update(body);
        res.status(STATUS_OK).send(user);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.delete("/:id", async (req: Request, res: Response) => {
      try {
        await this.controller.delete(req.params.id);
        res.status(STATUS_OK)
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.delete("/", async (req: Request, res: Response) => {
      try {
        const user = await this.login.logout(req.body.currentUser.id);
        res.status(STATUS_OK).send(user);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.post("/password/change", async ({ body }: Request, res: Response) => {
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
