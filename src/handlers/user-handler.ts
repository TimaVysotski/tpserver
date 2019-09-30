import express from "express";
import models from "../models/index";

export default class User {

  async showUsers(req: express.Request, res: express.Response) {
    const result = await models.user.find();
    res.send(result);
  }

  async createUser(req: express.Request, res: express.Response) {
    const result = await models.user.create({
      username: req.body.username,
      password: req.body.password,
      gender: req.body.gender
    });
    res.send(result);
  }
  // CHEACK deleteAllPostOfUser
  async deleteUser(req: express.Request, res: express.Response) {
    const result = await models.user.findOne({ username: req.body.username });
    if (result) {
      
        models.user.findByIdAndDelete(result._id, (err, doc) => {
          if (err) return console.log(err);
        });
        res.send("successful");
    } else {
      res.send("such an account does not exist");
    }
  }

  async updateUser(req: express.Request, res: express.Response) {
    const result = await models.user.findOne({ _id: req.body.id });
    if (result) {
      
        models.user.findByIdAndUpdate(result.id, {
          username: req.body.username,
          password: req.body.password,
          gender: req.body.gender
        }, { new: true }, (err, result) => {
          if (err) return console.log(err);
        });
        res.send("Your account succesfully update");
      
    } else {
      res.send("such an account does not exist");
    }
  }

  async login(req: express.Request, res: express.Response) {
    const result = await models.user.findOne({ username: req.body.username });
    if (result) {
      if (result.password == req.body.password) {
       
        res.redirect('/');
        res.send("Successful login");
      } else {
        res.send("Check you password");
      }
    } else {
      res.send("Check your login");
    }
  }

  async logout(req: express.Request, res: express.Response) {
    const result = await models.user.findOne({ username: req.body.username });
    if (result) {
      
        
        res.send("Successful logout");
  
    } else {
      res.send("NO existing User");
    }
  }

}

// export const checkAuthentication = async (id: string) => {
//   const result = await models.user.findOne({ _id: id });
//   if (result && result.isAuthenticated) {
//     return true
//   } else {
//     return false;
//   }
// }
