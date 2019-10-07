import express from "express";
import User from "../Services/UserService";

const userMethodes = new User();

const userRoutes = {
  post: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.create(req);
    res.send(result);
  },
  get: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.get(req);
    res.send(result);
  },
  delete: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.delete(req);
    return result;
  },
  put: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.update(req);
    return result;
  }
}

export default userRoutes;
