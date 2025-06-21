import { NextFunction, Request, Response } from "express";
import { getBySenderIdParams } from "../types/private.chat.content";
import { getBySenderId } from "../services/private.chat.content.service";

export const getBySenderIdHandler = async (req : Request<{},{},{},getBySenderIdParams>,res : Response,next : NextFunction)=>{
    try {
        
        const senderId = req.query.senderId;
        
        const content = await getBySenderId(senderId.toString());
        
        res.json(content)
    } catch (error) {
        
        next(error)
    }

}