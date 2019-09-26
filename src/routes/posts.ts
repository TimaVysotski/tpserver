import express from "express";
import Post from "../logic/post";

const postMethods = new Post;

export const posts = {
  get: (req: express.Request, res: express.Response) => {
    postMethods.showPosts(req, res);
  }
}

export const currentPost = {
  get: (req: express.Request, res: express.Response) => {
    postMethods.showCurrentPost(req, res);
  }
}

export const createPost = {
  post: (req: express.Request, res: express.Response) => {
    postMethods.createPost(req, res);
  }
}

export const updatePost = {
  post: (req: express.Request, res: express.Response) => {
    postMethods.updatePost(req, res);
  }
}

export const deletePost = {
  post: (req: express.Request, res: express.Response) => {
    postMethods.deletePost(req, res);
  }
}
