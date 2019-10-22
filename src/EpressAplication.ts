import dotenv from "dotenv";
import express from "express";
import { bodyParserHandler } from "./handlers/bodyParser-handler";
import configurateRoutes from "./routes/baseRoutes";

dotenv.config();

const app = express();


bodyParserHandler.init(app);
configurateRoutes.init(app);

export default app;
