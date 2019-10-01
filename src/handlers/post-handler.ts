import express from "express";
import models from "../models/index";
import { UpdatedPostRequest } from "../interfaces/express";

export default class Post {

  async getPosts() {
    const result = await models.post.find();
    return result;
  }

  async showCurrentPost({ body: { id: _id } }: UpdatedPostRequest) {
    const result = await models.post.findOne({ _id });
    return result;
  }

  async createPost({ body }: UpdatedPostRequest) {
    try {
      const result = await models.post.create(body);
      return result;
    } catch (error) {
      return error;
    }
  }

  async updatePost({ body }: express.Request) {
    try {
      const result = await models.post.findByIdAndUpdate(body.id, body)
      return result;
    } catch (error) {
      return error;
    }
  }

  async deletePost({ body: { id: _id } }: UpdatedPostRequest) {
    try {
      await models.post.findOne({ _id }).remove();
    } catch (error) {
      return error;
    }
  }
}
