import cookieParser from "cookie-parser";
import exprees from "express";

export const cookieParserHandler = {
    init: (app: exprees.Application) => {
        app.use(cookieParser());
    },
}