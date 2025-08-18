import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload }  from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/user.model.js";


async function userAuth(req: Request, res: Response, next: NextFunction){
    let token = req.headers.authorization as string;
    
    if (!token) {
        return res.status(403).json({
            message: "you're not authorized"
        })
    }
    
    token = token.split("Bearer ")[1] as string;
   
    const decoded = jwt.verify(token, config.jwt.secret as string );
    const user = await User.findOne({
        _id: (decoded as JwtPayload).userId
    })

    if(!user){
        return res.status(403).json({
            message: "you are not authorized",
        })
    }

   (req as any).userid = user._id.toString();
    next();
}

export default userAuth


