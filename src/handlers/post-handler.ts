import express from "express";
import models from "../models/index";
import { UpdatedRequest } from "../interfaces/express";
import { checkAuthentication } from "../handlers/user-handler";


export default class Post {

  async showPosts(req: UpdatedRequest, res: express.Response) {
    res.send(await models.post.find());
  }

  async showCurrentPost({ body: id }: UpdatedRequest, res: express.Response) {
    res.send(await models.post.findOne({ id }));
  }


  async createPost({ body }: UpdatedRequest, res: express.Response) {
    res.send(await models.post.create(body));
  }

  async updatePost({ body: { id: _id, text, postedBy } }: UpdatedRequest, res: express.Response) {
    const result = await models.post.findOne({ _id });

    if (result && checkAuthentication(result.postedBy)) {
      models.post.findByIdAndUpdate(result.id, {
        text: text
      }, { new: true }, (err, result) => {
        err ? console.log(err) : res.send("success!!");
      });
    } else {
      res.send("Error")
    }
  }

  notEmpty(...params: Array<any>) {
    params.forEach(it => {
      if (!it) {
        throw 'empty param';
      }
    })
  }

  async deletePost({ body: { id } }: UpdatedRequest, res: express.Response) {
    try {
      this.notEmpty(id);

      await models.post.findByIdAndDelete(id, (err) => {
        if (err) {
          throw err;
        }

        res.status(200).send();
      });

    } catch (error) {
      res.status(400).send({ message: error });
    }
  }
}
