import express from "express";
import models from "../models/index"

export const posts = {
  get: async (req: express.Request, res: express.Response) => {
    try {
      const result = await models.post.find();
      res.send(result);
    } catch{
    }
  }
}

export const currentPost = {
  get: async (req: express.Request, res: express.Response) => {
    try {
      const result = await models.post.findOne({'id': req.body.id});
      res.send(result);
    } catch {
    }
  }
}

export const createPost = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const result = await models.post.create({ text: req.body.text });
      res.send(result);
    } catch {
    }
  }
}
