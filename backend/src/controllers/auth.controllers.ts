import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const passwordSchema = z.string().refine((value) => {
    return /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value) && value.length >= 8;
}, {
    message: "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
});

const usernameSchema = z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^(?!.*[._]{2})(?![._])[a-zA-Z0-9._]+(?<![._])$/, {
        message: "Username must only contain letters, numbers, dots, or underscores, and not start/end with dot/underscore or have them consecutively",
    });


const signupSchema = z.object({
    firstName: z.string().min(2, "firstname should be of length greater then equal to 2"),
    lastName: z.string().min(2, "lastname should be of length greater then or equal to 2"),
    userName: usernameSchema,
    password: passwordSchema
})
1
async function signUp(req: Request, res: Response) {
    try {

        const body = req.body;
        const result = signupSchema.safeParse(body);

        if (!result.success) {
            return res.status(403).json({
                message: result.error
            });
        }

        const isUserExists = await User.findOne({
            userName: result.data.userName
        })

        if (isUserExists) {
            return res.status(403).json("user already exists");
        }


        const hash = await bcrypt.hash(body.password, 10);
        result.data.password = hash;
        const user = await User.create(result.data);

        const token = jwt.sign({
            userId: user._id
        }, "@Abhishek@2003", { expiresIn: '8h' });

        res.json({
            message: "id created successfully",
            token
        });

    } catch (err) {

        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }

}

async function signIn(req: Request, res: Response) {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({
            userName: userName
        })

        if (!user) {
            return res.status(403).json({
                message: "email or password is wrong"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password as string);

        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: "username or password is wrong"
            })
        }

        const token = jwt.sign({
            userId: user._id
        }, "@Abhishek@2003", { expiresIn: '8h' });

        res.json({
            message: "login successfull",
            token,
        })

    } catch (err) {

        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }

}

export { signUp, signIn }