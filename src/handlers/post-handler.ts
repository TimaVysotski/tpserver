import express from "express";
import models from "../models/index";
import { UpdatedPostRequest } from "../interfaces/express";

export default class Post {

  async showPosts(req: express.Request, res: express.Response) {
    const result = await models.post.find();
    res.send(result);
  }

  async showCurrentPost({ body: id }: UpdatedPostRequest, res: express.Response) {
    const result = await models.post.findOne({ id });
    res.send(result);
  }

  async createPost({ body: { text, postedBy } }: UpdatedPostRequest, res: express.Response) {
    try {
      await models.post.create({
        text: text,
        postedBy: postedBy
      });
      res.redirect('/');
    } catch (error) {
      res.status(404).send(error);
    }
  }

  async updatePost({ body: { id: _id, text } }: express.Request, res: express.Response) {
    try {
      await models.post.findByIdAndUpdate(_id, {
        text: text
      })
      res.redirect('/');
    } catch (error) {
      res.status(404).send(error);
    }
  }

  async deletePost({ body: { id: _id } }: express.Request, res: express.Response) {
    try {
      await models.post.findOne({ _id }).remove();
      res.redirect('/');
    } catch (error) {
      res.status(404).send(error);
    }
  }
}
