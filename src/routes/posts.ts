import express from "express";
import Post from "../handlers/post-handler";

const postMethods = new Post;

export const posts = {
  get: async (req: express.Request, res: express.Response) => {
    const result = await postMethods.getPosts();
    res.send(result);
  }
}

export const currentPost = {
  get: async (req: express.Request, res: express.Response) => {
    const result = await postMethods.showCurrentPost(req);
    res.send(result);
  }
}

export const createPost = {
  post: async (req: express.Request, res: express.Response) => {
    const result = await postMethods.createPost(req);
    res.send(result);
  }
}

export const updatePost = {
  put: async (req: express.Request, res: express.Response) => {
    const result = await postMethods.updatePost(req);
    res.send(result);
  }
}

export const deletePost = {
  delete: async (req: express.Request, res: express.Response) => {
    try {
      await postMethods.deletePost(req);
      res.redirect('/');
    } catch (error) {
      res.status(404).send(error);
    }
  }
}
