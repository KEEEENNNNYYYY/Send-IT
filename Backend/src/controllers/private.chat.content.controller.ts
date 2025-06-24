import { NextFunction, Request, Response } from "express";
import { getPrivateMessageParams } from "../types/private.chat.content";
import { getPrivateMessage } from "../services/private.chat.content.service";

export const getPrivateMessageHandler = async (req : Request<{},{},{},getPrivateMessageParams>,res : Response,next : NextFunction)=>{
    try {
        
        const params = req.query;
        const content = await getPrivateMessage(params);
        
        res.json(content)
    } catch (error) {
        next(error)
    }

}