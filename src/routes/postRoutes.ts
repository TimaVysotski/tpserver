import express from "express";
import PostService from "../Services/PostService";

const postMethods = new PostService();

const postRoutes = {
  get: async (req: express.Request, res: express.Response) => {
    const result = await postMethods.get(req);
    res.send(result);
  },
  post: async (req: express.Request, res: express.Response) => {
    const result = await postMethods.create(req);
    res.send(result);
  },
  put: async (req: express.Request, res: express.Response) => {
    const result = await postMethods.update(req);
    res.send(result);
  },
  delete: async (req: express.Request, res: express.Response) => {
    try {
      await postMethods.delete(req);
      res.redirect('/');
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

export default postRoutes;
