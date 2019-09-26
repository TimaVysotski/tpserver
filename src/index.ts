import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./models";
import { sessionHandler } from "./handlers/session-handler";
import { passportHandler } from "./handlers/passport-handler";
import { bodyParserHandler } from "./handlers/bodyParser-handler";
import { cookieParserHandler } from "./handlers/cookieParser-handler"
import { posts, currentPost, createPost, updatePost, deletePost } from "./routes/posts";
import { users, createUser, deleteUser, updateUser, login, logout } from "./routes/users";

dotenv.config();

export const app = express();

bodyParserHandler.init(app);
cookieParserHandler.init(app);
sessionHandler.init(app);
passportHandler.init(app);

connectDB()
    .then(() => app.listen(process.env.PORT))
    .catch(console.log);


app.get('/', posts.get);
app.get('/posts/:id', currentPost.get);
app.post('/post/create', createPost.post);
app.post('/post/update', updatePost.post);
app.post('/post/delete', deletePost.post);

app.get('/users', users.get);
app.post('/login', login.post);
app.post('/logout', logout.post);
app.post('/user/create', createUser.post);
app.post('/user/delete', deleteUser.post);
app.post('/user/update', updateUser.post);
