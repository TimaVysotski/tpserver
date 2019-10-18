import app from "./EpressAplication";
import connectDB from "./db/config";

connectDB()
    .then(() => app.listen(process.env.PORT))
    .catch(console.log);


