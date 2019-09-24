"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
exports.sessionHandler = {
    init: (app) => app.use(express_session_1.default({
        cookie: { secure: true },
        resave: false,
        saveUninitialized: true,
        secret: "Secret key",
    })),
};
