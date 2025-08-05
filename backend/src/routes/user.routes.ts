import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import { getUserContent, getContent, postContet, share } from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.post('/content', userAuth, postContet)

userRouter.get('/content', userAuth, getContent)

userRouter.post("/share", userAuth, share)

userRouter.get('/share/:hash',getUserContent)

export default userRouter;