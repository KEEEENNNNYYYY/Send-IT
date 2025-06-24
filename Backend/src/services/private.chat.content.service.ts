import winston from "winston";
import {privateContentModel} from "../models/private.chat.content.model"
import { getPrivateMessageParams } from "../types/private.chat.content";
import { private_chat_content } from "../types/private.chat.type";

export async function getPrivateMessage(params : getPrivateMessageParams){
    try {
        const chat_content = await privateContentModel.getBySenderId(params.senderId.toString());
        const filteredContent = chat_content.filter((content : private_chat_content)=>content.private_chat_id == params.privateChatId)
        return filteredContent;
    } catch (error) {
        winston.error("error :"+error)
    }
    
}