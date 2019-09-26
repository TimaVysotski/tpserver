import express from "express";
import models from "../models/index";

export default class Post {

  async showPosts(req: express.Request, res: express.Response) {
    const result = await models.post.find();
    res.send(result);
  }

  async showCurrentPost(req: express.Request, res: express.Response) {
    const result = await models.post.findOne({ 'id': req.body.id });
    res.send(result);
  }

  async createPost(req: express.Request, res: express.Response) {
    const result = await models.post.create({
      text: req.body.text,
      postedBy: req.body.postedBy
    });
    res.send(result);
  }

  async updatePost(req: express.Request, res: express.Response) {
    const result = await models.post.findOne({ _id: req.body.id });
    if (result) {
      console.log(result);
      const currentUser = await models.user.findOne({ _id: result.postedBy });
      if (currentUser) {
        if (currentUser.isAuthenticated == true) {
          models.post.findByIdAndUpdate(result.id, {
            text: req.body.text
          }, { new: true }, (err, result) => {
            if (err) return console.log(err);
          });
          res.send("success!!");
        } else {
          res.send("You need to login before updating");
        }
      } else {
        res.send("Issues with User");
      }
    } else {
      res.send("Check id of the post");
    }
  }

  async deletePost(req: express.Request, res: express.Response) {
    const result = await models.post.findOne({ _id: req.body.id });
    if (result) {
      const currentUser = await models.user.findOne({ _id: result.postedBy });
      if (currentUser) {
        if (currentUser.isAuthenticated == true) {
          models.post.findByIdAndDelete(result._id, (err, doc) => {
            if (err) return console.log(err);
          });
          res.send("success!!");
        } else {
          res.send("You need to login before deleting");
        }
      } else {
        res.send("Issues with User");
      }
    } else {
      res.send("Check id of the post");
    }
  }

  async deleteAllPostOfUser(req: express.Request, res: express.Response) {
    await models.post.remove({ postedBy: req.body.id });
    res.send("All posts was deleted successfully");
  }

}
