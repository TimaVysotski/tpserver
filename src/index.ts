import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./models";
import { bodyParserHandler } from "./handlers/bodyParser-handler";
import { posts, currentPost, createPost, updatePost, deletePost } from "./routes/posts";
import { users, createUser, deleteUser, updateUser, login, logout } from "./routes/users";

dotenv.config();

export const app = express();

bodyParserHandler.init(app);


connectDB()
    .then(() => app.listen(process.env.PORT))
    .catch(console.log);


app.get('/', posts.get);
app.get('/posts/:id', currentPost.get);
app.post('/post', createPost.post);
app.put('/post', updatePost.put);
app.delete('/post', deletePost.delete);

app.get('/users', users.get);
app.post('/login', login.post);
app.post('/logout', logout.post);
app.post('/user', createUser.post);
app.delete('/user', deleteUser.delete);
app.put('/user', updateUser.put);
