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
    this.router.get("/", async (req: express.Request, res: express.Response) => {
      try {
        const posts = await this.controller.findAll();
        res.status(STATUS_OK).send(posts);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.get("/:id", async ({ params: { id } }: express.Request, res: express.Response) => {
      try {
        const post = await this.controller.findById(id);
        res.status(STATUS_OK).send(post);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.post("/", async ({ body }: express.Request, res: express.Response) => {
      try {
        const post = await this.controller.create({
          user: body.currentUser,
          text: body.text,
        } as IPost);
        res.status(STATUS_OK).send(post);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.put("/:id", async ({ body, params }: express.Request, res: express.Response) => {
      try {
        const post = await this.controller.update(body.text, params.id);
        res.status(STATUS_OK).send(post);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });

    this.router.delete("/:id", async (req: express.Request, res: express.Response) => {
      try {
        await this.controller.delete(req.params.id);
        res.status(STATUS_OK);
      } catch (error) {
        res.status(STATUS_NOT_FOUND).send(error);
      };
    });
  };
};

export default new PostRoutes().router;
