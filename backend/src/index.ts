import express from "express"
import config from "./config/config.js"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js"; 
import userRouter from "./routes/user.routes.js";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

connectDB()
.then(() => {
    app.listen(config.port, ()=>{
        console.log(`Server is running on port ${config.port}`);
    })
})
.catch(err => {
    console.log(err.message);
})