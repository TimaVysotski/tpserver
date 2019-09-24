import express from "express";
import session from "express-session";

export const sessionHandler = {
  init: (app: express.Application) =>
    app.use(
      session({
        cookie: { secure: true },
        resave: false,
        saveUninitialized: true,
        secret: "Secret key",
      })
    ),
};