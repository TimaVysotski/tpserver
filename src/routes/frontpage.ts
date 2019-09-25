import express from "express";

export const frontPage = {
    get: async (req: express.Request, res: express.Response) => {
        checkAuthentication(req, res); 
    }
}


const checkAuthentication = (req: express.Request, res: express.Response) => {
    if (req.isAuthenticated()) {
        res.send("welcome");
    } else {
        res.send("You are not logged!");
    }
}