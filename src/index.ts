import dotenv from "dotenv";
import express from "express";
//import { connect } from "mongodb";
import models, { connectDB } from "./models";
import { createUserWithMessages } from "./seeds/user";
import { bodyParserHandler } from "./handlers/bodyParser-handler";

dotenv.config();

const app = express();

bodyParserHandler.init(app);


const eraseDatabaseOnSync = true;

app.get('/', (req, res) => {
    res.send('Hi');
});


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