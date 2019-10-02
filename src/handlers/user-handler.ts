import express from "express";
import models from "../models/index";
import { UpdatedUserRequest } from "../interfaces/express";
import { Validation } from "../handlers/validation-handler";
import { Middelware } from "../middleware/index";

export default class User {

  async createUser({ body }: UpdatedUserRequest) {
    try {
      Validation.notEmpty(body);
      Validation.checkForValidUserData(body);
      body.password = await Middelware.createHash(body.password);
      const result = await models.user.create(body);
      return result;
    } catch (error) {
      return error;
    }
  }

  async getUsers(req: UpdatedUserRequest) {
    const result = await models.user.find();
    return result;
  }

  // CHEACK deleteAllPostOfUser
  async deleteUser({ body: { id: _id } }: UpdatedUserRequest) {
    try {
      Validation.notEmpty(_id);
      await models.user.findOne({ _id }).remove();
      return "success"
    } catch (error) {
      return error;
    }
  }

  async updateUser({ body }: express.Request) {
    try {
      Validation.notEmpty(body);
      const result = await models.user.findByIdAndUpdate(body.id, body);
      return result;
    } catch (error) {
      return error;
    }
  }

  async login({ body: { username, password } }: UpdatedUserRequest) {
    try {
      Validation.notEmpty({ username, password });
      const result = await models.user.findOne({ username });
      const authentication = await Middelware.checkPassword(result, password);
      if (authentication) {
        return result;
      } else {
        throw `Error! Invalid password.`;
      }
    } catch (error) {
      return error;
    }

  }

  async logout({ body: { username } }: UpdatedUserRequest) {
    try {
      Validation.notEmpty(username);
      const result = await models.user.findOne({ username });
      if (result && result.username == username) {
        return "success";
      }
    } catch (error) {
      return error;
    }
  }

}

