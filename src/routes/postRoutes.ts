import express, { Router } from "express";
import PostController from "../db/controllers/PostController";
import { STATUS_OK, STATUS_NOT_FOUND } from "../constants/api";
import { IPost } from "../interfaces/post";

class PostRoutes {
  private controller: PostController;
  readonly router: express.Router;

  constructor() {
    this.controller = new PostController();
    this.router = Router();
    this.initRoutes();
  };

  initRoutes(): void {
    this.router.get("/", (req: express.Request, res: express.Response) => {
      this.controller.findAll()
        .then(posts => res.status(STATUS_OK).send(posts))
        .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });

    this.router.get("/:id", ({ params: { id } }: express.Request, res: express.Response) => {
      this.controller.findById(id)
        .then(post => res.status(STATUS_OK).send(post))
        .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });

    this.router.post("/", ({ body }: express.Request, res: express.Response) => {
      this.controller.create({
        user: body.currentUser,
        text: body.text,
      } as IPost)
        .then(post => res.status(STATUS_OK).send(post))
        .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });

    this.router.put("/:id", ({ body, params }: express.Request, res: express.Response) => {
      this.controller.update(body.text, params.id)
        .then(post => res.status(STATUS_OK).send(post))
        .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });

    this.router.delete("/:id", (req: express.Request, res: express.Response) => {
      this.controller.delete(req.params.id)
        .then(() => res.status(STATUS_OK))
        .catch(error => res.status(STATUS_NOT_FOUND).send(error));
    });
  };
};

export default new PostRoutes().router;
