import dotenv from "dotenv";
import express from "express";
import { bodyParserHandler } from "./handlers/bodyParser-handler";

dotenv.config();

const app = express();

bodyParserHandler.init(app);

export default app;
