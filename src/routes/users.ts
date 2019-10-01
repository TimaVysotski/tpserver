import express from "express";
import User from "../handlers/user-handler";

const userMethodes = new User;

export const users = {
  get: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.getUsers(req);
    res.send(result);
  }
}

export const createUser = {
  post: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.createUser(req);
    res.send(result);
  }
}

export const login = {
  post: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.login(req);
    res.send(result);
  }
}

export const logout = {
  post: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.logout(req);
    return result;
  }
}

export const deleteUser = {
  delete: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.deleteUser(req);
    return result;
  }
}

export const updateUser = {
  put: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.updateUser(req);
    return result;
  }
}
