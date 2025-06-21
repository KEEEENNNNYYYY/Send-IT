import winston from "winston";
import {privateContentModel} from "../models/private.chat.content.model"

export async function getBySenderId(sender_id:string){
    try {
        const chat_content = await privateContentModel.getBySenderId(sender_id);
        return chat_content;
    } catch (error) {
        winston.error("error :"+error)
    }
    
}