import { NextFunction, Request, Response } from "express";
import { getPrivateMessageParams } from "../types/private.chat.content.type";
import { getPrivateMessage,saveContent } from "../services/private.chat.content.service";
import { createMessageBody } from "../types/requestBody";

export const getPrivateMessageHandler = async (req : Request<{},{},{},getPrivateMessageParams>,res : Response,next : NextFunction)=>{
    try {
        
        const params = req.query;
        const content = await getPrivateMessage(params);
        
        res.json(content)
    } catch (error) {
        next(error)
    }

}

export const savePrivateMessageHandler = async (req : Request<{privateChatId:string},{},createMessageBody>,res:Response,next : NextFunction)=>{

    try {
        
        const privateChatId = req.params.privateChatId;
        const messageBody = req.body;
        const content_to_save = {...messageBody,privateChatId:privateChatId}
        const response = await saveContent(content_to_save)
            res.json(response)

    } catch (error) {
        next(error)
    }

}