import express from "express";

export const frontPage = {
    get: async (req: express.Request, res: express.Response) => {
        if (req.isAuthenticated()) {
            res.send("Welcome!");
        } else {
            res.send("You are not logged!");
        }
    }
} 
