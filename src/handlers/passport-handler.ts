import express from "express";
import passport from "passport";

export const passportHandler = {
  init: (app: express.Application) => {
    app.use(passport.initialize());
    app.use(passport.session());
  },
};