import express from "express";
import models from "../models/index";
import { UpdatedUserRequest } from "../interfaces/express";
import ValidationHandler from "../handlers/validation-handler";

const validation = new ValidationHandler();

export default class User {

  async createUser({ body }: UpdatedUserRequest) {
    try {
      //validation.notEmpty(...body);
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
      await models.user.findOne({ _id }).remove();
      return "success"
    } catch (error) {
      return error;
    }
  }

  async updateUser({ body }: express.Request) {
    try {
      const result = await models.user.findByIdAndUpdate(body.id, body);
      return result;
    } catch (error) {
      return error;
    }
  }

  async login({ body: { username, password } }: UpdatedUserRequest) {
    try {
      const result = await models.user.findOne({ username });
      if (result && result.password == password) {
        return result;
      }
    } catch (error) {
      return error;
    }

  }

  async logout({ body: { username } }: UpdatedUserRequest) {
    try {
      const result = await models.user.findOne({ username });
      if (result && result.username == username) {
        return "success";
      }
    } catch (error) {
      return error;
    }
  }

}

