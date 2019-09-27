"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
exports.passportHandler = {
    init: (app) => {
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
    },
};