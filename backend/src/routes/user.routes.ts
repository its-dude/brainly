import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import { getUserContent, getContent, postContet, share, deleteContent } from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.post('/content', userAuth, postContet)

userRouter.get('/content', userAuth, getContent)

userRouter.delete('/content/:contentId', userAuth, deleteContent)

userRouter.post("/share", userAuth, share)

userRouter.get('/share/:hash',getUserContent)

export default userRouter;