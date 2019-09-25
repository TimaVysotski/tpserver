import express from "express";
import models from "../models/index"

export const users = {
  get: async (req: express.Request, res: express.Response) => {
    try{
      const result = await models.user.find();
      res.send(result);
    } catch {
    }
  }
}

export const createUser = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const result = await models.user.create({username: req.body.username, password: req.body.password, gender: req.body.gender});
      res.send(result);
    } catch {
    }
  }
}