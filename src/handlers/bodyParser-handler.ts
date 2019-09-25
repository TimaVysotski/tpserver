import bodyParser from "body-parser";
import express from "express";

export const bodyParserHandler = {
    init: (app: express.Application) => {
        app.use(bodyParser.json());
    },
};
