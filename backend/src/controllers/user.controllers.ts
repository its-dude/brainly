import Link from "../models/link.model.js";
import Content from "../models/content.model.js";
import randomHash from "../utils/randomHash.util.js";
import type { Request, Response } from "express";

export async function postContet(req: Request, res: Response) {
    try {
        const { title, link, type } = req.body;
        const userContent = await Content.create({
            title,
            link,
            type,
            userId: (req as any).userId,
            tags: []
        });

        res.json({
            message: "content created",
            content: userContent.toString(),
        })

    } catch (err) {
        res.status(411).json({
            message: "failed creating content",
        })
    }
}

export async function getContent(req: Request, res: Response) {
    try {
        const content = await Content.find({
            userId: (req as any).userId
        }).populate('userId',"firstName _id");

        res.json({
            contents: content
        })

    } catch (err) {
        res.status(411).json({
            message: "failed to get content"
        })
    }
}

export async function deleteContent(req: Request, res: Response) {
    try {
        const contentId = req.params.contentId;
        if (!contentId) {
            return res.status(411).json({
                message: "please enter a valid content id"
            })
        }

        const content = await Content.deleteOne({
            _id: contentId
        });

        res.json({
            message: "content deleted successfully"
        })

    } catch (error) {
        res.status(411).json({
            message: "invalid request"
        })
    }
}

export async function share(req: Request, res: Response) {
     try {

        const existingLink = await Link.findOne({
            userId: (req as any).userId
        });
        
        if (existingLink) {
          await existingLink.deleteOne();

           return res.json({
            message: "link deleted successfully"
           })

        } else {

            const hash = randomHash();
            const link = await Link.create({
                hash,
                userId: (req as any).userId
            });

            res.json({
                link: link.hash
            })

        }

     } catch(err) {
            res.json({
                message: "error in generating link"
            })
     }
}

export async function getUserContent(req: Request, res: Response) {
    try{
        const hash = req.params.hash;
        const link = await Link.findOne({
            hash
        })

        if(!link){
            return res.status(411).json({
                message: "Invalid link"
            })
        }

        const userId = link.userId;
        const contents = await Content.find({
            userId
        })

        res.json(contents);

    }catch(err){
        res.status(411).json({
            message:"failed to access user content"
        })
    }
}