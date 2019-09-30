import express from "express";
import models from "../models/index";
import { UpdatedRequest } from "../interfaces/express";

export default class User {

  async showUsers(req: UpdatedRequest, res: express.Response) {
    res.send(await models.user.find());
  }

  async createUser(req: express.Request, res: express.Response) {
    const result = await models.user.create({
      username: req.body.username,
      password: req.body.password,
      gender: req.body.gender,
      isAuthenticated: false
    });
    res.send(result);
  }
  // CHEACK deleteAllPostOfUser
  async deleteUser({ body: { id: _id } }: UpdatedRequest, res: express.Response) {
    const result = await models.user.findOne({ _id });
    if (result) {
      if (result.isAuthenticated) {
        models.user.findByIdAndDelete(result._id, (err, doc) => {
          if (err) return console.log(err);
        });
        res.send("successful");
      } else {
        res.send("Login before deleting");
      }
    } else {
      res.send("such an account does not exist");
    }
  }

  async updateUser({ body: { id: _id, username, gender } }: UpdatedRequest, res: express.Response) {
    const result = await models.user.findOne({ _id });
    if (result) {
      if (result.isAuthenticated) {
        models.user.findByIdAndUpdate(result.id, { body: { username, gender } }, { new: true });
        res.send("Your account succesfully update");
      } else {
        res.send("Login before updating");
      }
    } else {
      res.send("such an account does not exist");
    }
  }

  // async login({ body: { email, password } }: UpdatedRequest, res: express.Response) {
  //   const result = await models.user.findOne({ email });
  //   if (result) {
  //     if (result.password == {password}) {
  //       models.user.updateOne({ _id: result.id }, { isAuthenticated: true }, (err, result) => {
  //         if (err) return console.log(err);
  //       });
  //       res.redirect('/');
  //       res.send("Successful login");
  //     } else {
  //       res.send("Check you password");
  //     }
  //   } else {
  //     res.send("Check your login");
  //   }
  // }


  async logout(req: express.Request, res: express.Response) {
    const result = await models.user.findOne({ username: req.body.username });
    if (result) {
      if (result.isAuthenticated) {
        models.user.updateOne({ _id: result.id }, { isAuthenticated: false }, (err, result) => {
          if (err) return console.log(err);
        });
        res.send("Successful logout");
      } else {
        res.send("You are already logout");
      }
    } else {
      res.send("NO existing User");
    }
  }

}

export const checkAuthentication = async (id: string) => {
  const result = await models.user.findOne({ _id: id });
  if (result && result.isAuthenticated) {
    return true
  } else {
    return false;
  }
}
