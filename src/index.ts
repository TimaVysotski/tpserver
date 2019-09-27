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
app.post('/post/create', createPost.post);
app.put('/post/update', updatePost.put);
app.delete('/post/delete', deletePost.delete);

app.get('/users', users.get);
app.post('/login', login.post);
app.post('/logout', logout.post);
app.post('/user/create', createUser.post);
app.delete('/user/delete', deleteUser.delete);
app.put('/user/update', updateUser.put);
