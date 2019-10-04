import app from "./EpressAplication";
import connectDB from "./db/config";
import { posts, currentPost, createPost, updatePost, deletePost } from "./routes/posts";
import userRoutes from "./routes/users";

connectDB()
    .then(() => app.listen(process.env.PORT))
    .catch(console.log);


app.get('/', posts.get);
app.get('/posts/:id', currentPost.get);
app.post('/post', createPost.post);
app.put('/post', updatePost.put);
app.delete('/post', deletePost.delete);

app.get('/user', userRoutes.get);
// app.post('/login', login.post);
// app.post('/logout', logout.post);
app.post('/user', userRoutes.post); ``
app.delete('/user', userRoutes.delete);
app.put('/user', userRoutes.put);
