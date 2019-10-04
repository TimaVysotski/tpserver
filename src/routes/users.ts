import express from "express";
import User from "../Services/UserService";

const userMethodes = new User;

const userRoutes = {
  post: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.createUser(req);
    res.send(result);
  },
  get: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.getUsers(req);
    res.send(result);
  },
  delete: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.deleteUser(req);
    return result;
  },
  put: async (req: express.Request, res: express.Response) => {
    const result = await userMethodes.updateUser(req);
    return result;
  }
}

export default userRoutes;

// export const login = {
//   post: async (req: express.Request, res: express.Response) => {
//     const result = await userMethodes.login(req);
//     res.send(result);
//   }
// }

// export const logout = {
//   post: async (req: express.Request, res: express.Response) => {
//     const result = await userMethodes.logout(req);
//     return result;
//   }
// }
