import dotenv from "dotenv";
import express from "express";
import models, { connectDB } from "./models";
import {sessionHandler} from "./handlers/session-handler";
import {passportHandler} from "./handlers/passport-handler";
import { createUserWithMessages } from "./seeds/user";
import { bodyParserHandler } from "./handlers/bodyParser-handler";
import { cookieParserHandler } from "./handlers/cookieParser-handler"
import { login, logout } from "./routes/auth";
import { frontPage } from "./routes/frontpage";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

const eraseDatabaseOnSync = true;

// bodyParserHandler.init(app);
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

cookieParserHandler.init(app);
sessionHandler.init(app);
passportHandler.init(app);

connectDB().then(async () => {
    if(eraseDatabaseOnSync){
        await Promise.all([
            models.User.deleteMany({}), 
            models.Post.deleteMany({})
        ]);
        createUserWithMessages();
    }

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port :${process.env.PORT}`);
        console.log("DATABASE_URL : " + process.env.DATABASE_URL);
    })
}).catch(error => console.log(error));



app.get('/', frontPage.get);

app.post("/login", login.post);
app.post("/logout", logout.post);

