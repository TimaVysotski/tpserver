import express from "express";
import models from "../models/index";
import { UpdatedUserRequest } from "../interfaces/express";

export default class User {

  async createUser({ body: { username, password, gender } }: UpdatedUserRequest, res: express.Response) {
    try {
      const result = await models.user.create({
        username: username,
        password: password,
        gender: gender,
      });
      res.send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  async showUsers(req: UpdatedUserRequest, res: express.Response) {
    const result = await models.user.find();
    res.send(result);
  }

  // CHEACK deleteAllPostOfUser
  async deleteUser({ body: { id: _id } }: UpdatedUserRequest, res: express.Response) {
    try {
      await models.user.findOne({ _id }).remove();
      res.redirect('/users');
    } catch (error) {
      res.status(404).send(error);
    }
  }

  async updateUser({ body: { id: _id, username, password, gender } }: express.Request, res: express.Response) {
    try {
      await models.user.findByIdAndUpdate(_id, {
        username: username,
        password: password,
        gender: gender
      });
      res.redirect('/users');
    } catch (error) {
      res.status(404).send(error);
    }
  }

  async login({ body: { username, password } }: UpdatedUserRequest, res: express.Response) {
    try {
      const result = await models.user.findOne({ username });
      if (result && result.password == password) {
        res.redirect('/');
      }
    } catch (error) {
      res.status(404).send(error);
    }

  }

  async logout({ body: { username } }: UpdatedUserRequest, res: express.Response) {
    try {
      const result = await models.user.findOne({ username });
      if (result && result.username == username) {
        res.send("success")
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

}

