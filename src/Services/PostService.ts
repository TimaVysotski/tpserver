import express from "express";
import models from "../models/index";
import { UpdatedPostRequest } from "../interfaces/express";

export default class PostService {

  async get(req: UpdatedPostRequest) {
    const result = await models.post.find();
    return result;
  }

  async showCurrentPost({ body: { id: _id } }: UpdatedPostRequest) {
    const result = await models.post.findOne({ _id });
    return result;
  }

  async create({ body }: UpdatedPostRequest) {
    try {
      const result = await models.post.create(body);
      return result;
    } catch (error) {
      return error;
    }
  }

  async update({ body }: express.Request) {
    try {
      const result = await models.post.findByIdAndUpdate(body.id, body)
      return result;
    } catch (error) {
      return error;
    }
  }

  async delete({ body: { id: _id } }: UpdatedPostRequest) {
    try {
      await models.post.findOne({ _id }).remove();
    } catch (error) {
      return error;
    }
  }
}
