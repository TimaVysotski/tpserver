import express from "express";
import models from "../models/index";
import { UpdatedUserRequest } from "../interfaces/express";
import { Validation } from "../handlers/validation-handler";
import { BcryptMiddelware } from "../middleware/bcrypt";

export default class User {

  async create({ body }: UpdatedUserRequest) {
    try {
      Validation.notEmpty(body);
      Validation.checkForValidUserData(body);
      body.password = await BcryptMiddelware.createHash(body.password);
      const result = await models.user.create(body);
      return result;
    } catch (error) {
      return error;
    }
  }

  async get(req: UpdatedUserRequest) {
    const result = await models.user.find();
    return result;
  }

  // CHEACK deleteAllPostOfUser
  async delete({ body: { id: _id } }: UpdatedUserRequest) {
    try {
      Validation.notEmpty({ _id });
      await models.user.findOne({ _id }).remove();
      return "success"
    } catch (error) {
      return error;
    }
  }

  async update({ body }: express.Request) {
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
      const authentication = await BcryptMiddelware.checkPassword(result, password);
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
      Validation.notEmpty({ username });
      const result = await models.user.findOne({ username });
      if (result && result.username == username) {
        return "success";
      }
    } catch (error) {
      return error;
    }
  }

}
