import express from "express";
import models from "../models/index"

export const users = {
  get: async (req: express.Request, res: express.Response) => {
    try {
      const result = await models.user.find();
      res.send(result);
    } catch {
    }
  }
}

export const createUser = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const result = await models.user.create({ username: req.body.username, password: req.body.password, gender: req.body.gender, isAuthenticated: false });
      res.send(result);
    } catch {
    }
  }
}

export const login = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const result = await models.user.findOne({ username: req.body.username });
      if (result) {
        if (result.password == req.body.password) {
          models.user.updateOne({ _id: result.id }, { isAuthenticated: true }, (err, result) => {
            if (err) return console.log(err);
          });
          res.redirect('/');
          res.send("Successful login");
        } else {
          res.send("Check you password");
        }
      } else {
        res.send("Check your login");
      }
    } catch {
    }
  }
}

export const logout = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const result = await models.user.findOne({ username: req.body.username });
      if (result) {
        if (result.isAuthenticated == true) {
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
    } catch {
    }
  }
}

export const deleteUser = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const result = await models.user.findOne({ username: req.body.username });
      if (result) {
        if (result.isAuthenticated == true) {
          await models.user.remove({ _id: result.id });
          res.send("successful");
        } else {
          res.send("Login before deleting");
        }
      } else {
        res.send("such an account does not exist");
      }
    } catch {
    }
  }
}

export const updateUser = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const result = await models.user.findOne({ _id: req.body.id });
      if (result) {
        if (result.isAuthenticated == true) {
          models.user.findByIdAndUpdate(result.id, { 
            username: req.body.username, 
            password: req.body.password, 
            gender: req.body.gender 
          }, { new: true }, (err, result) => {
            if (err) return console.log(err);
          });
          res.send("Your account succesfully update");
        } else {
          res.send("Login before updating");
        }
      } else {
        res.send("such an account does not exist");
      }
    } catch {
    }
  }
}