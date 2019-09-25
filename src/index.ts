import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./models";
import { sessionHandler } from "./handlers/session-handler";
import { passportHandler } from "./handlers/passport-handler";
import { bodyParserHandler } from "./handlers/bodyParser-handler";
import { cookieParserHandler } from "./handlers/cookieParser-handler"
import { login, logout } from "./routes/auth";
import { posts, currentPost, createPost } from "./routes/posts";
import { users, createUser } from "./routes/users";

dotenv.config();

const app = express();

bodyParserHandler.init(app);
cookieParserHandler.init(app);
sessionHandler.init(app);
passportHandler.init(app);

connectDB()
    .then(() => app.listen(process.env.PORT))
    .catch(console.log);


app.get('/posts', posts.get);
app.get('/users', users.get);
app.get('/posts/:id', currentPost.get);
app.post('/create/post', createPost.post);
app.post('/create/user', createUser.post);
app.post("/login", login.post);
app.post("/logout", logout.post);
