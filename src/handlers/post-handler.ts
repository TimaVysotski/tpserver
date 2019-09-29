import express from "express";
import models from "../models/index";
import { checkAuthentication } from "../handlers/user-handler";


interface UpdateRequest extends express.Request {
  body: {
    id?: string;
    text?: string;
    postedBy?: string
  };
};

export default class Post {

  async showPosts(req: express.Request, res: express.Response) {
    const result = await models.post.find();
    res.send(result);
  }

  async showCurrentPost({ body: id }: express.Request, res: express.Response) {
    const result = await models.post.findOne({ id });
    res.send(result);
  }
  

  async createPost({ body }: UpdateRequest, res: express.Response) {
    const result = await models.post.create(body);
    res.send(result);
  }

  async updatePost({ body: { id : _id, text, postedBy } }: UpdateRequest, res: express.Response) {
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

  notEmpty(...params : Array<any>){
    params.forEach(it => {
      if (!it){
        throw 'empty param';
      }
    })
  }

  async deletePost({ body: { id } }: UpdateRequest, res: express.Response) {
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

  async deleteAllPostOfUser(req: express.Request, res: express.Response) {
    await models.post.remove({ postedBy: req.body.id });
    res.send("All posts was deleted successfully");
  }

}
