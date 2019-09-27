import express from "express";
import User from "../logic/user";

const userMethodes = new User;

export const users = {
  get: async (req: express.Request, res: express.Response) => {
    userMethodes.showUsers(req, res);
  }
}

export const createUser = {
  post: async (req: express.Request, res: express.Response) => {
    userMethodes.createUser(req, res);
  }
}

export const login = {
  post: async (req: express.Request, res: express.Response) => {
    userMethodes.login(req, res);
  }
}

export const logout = {
  post: async (req: express.Request, res: express.Response) => {
    userMethodes.logout(req, res);
  }
}

export const deleteUser = {
  delete: async (req: express.Request, res: express.Response) => {
    userMethodes.deleteUser(req, res);
  }
}

export const updateUser = {
  put: async (req: express.Request, res: express.Response) => {
    userMethodes.updateUser(req, res);
  }
}
