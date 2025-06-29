import winston from "winston";
import {privateContentModel} from "../models/private.chat.content.model"
import { getPrivateMessageParams, Private_content_to_save } from "../types/private.chat.content.type";
import { private_chat_content } from "../types/private.chat.content.type";

export async function getPrivateMessage(params : getPrivateMessageParams){
    try {
        const chat_content = await privateContentModel.getBySenderId(params.senderId.toString(),params.privateChatId.toString());
        winston.info("content ",chat_content)
        return chat_content.map((content)=>({
            id : content.id,
            timestamp : content.sending_date,
            text : content.content 
        }));
    } catch (error) {
        winston.error("error :"+error)
    }
    
}

export async function saveContent(content_to_save: Private_content_to_save ){

    try {
        const savedContent = await privateContentModel.savePrivateContent(content_to_save)
        return savedContent;
    } catch (error) {
        winston.error("error",error);
    }

}