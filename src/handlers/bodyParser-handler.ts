import bodyParser from "body-parser";
import { Application } from "express";

export const bodyParserHandler = {
    init: (app: Application) => {
        app.use(bodyParser.json());
    },
};
