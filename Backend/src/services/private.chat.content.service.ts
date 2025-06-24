import winston from "winston";
import {privateContentModel} from "../models/private.chat.content.model"
import { getPrivateMessageParams, Private_content_to_save } from "../types/private.chat.content.type";
import { private_chat_content } from "../types/private.chat.content.type";

export async function getPrivateMessage(params : getPrivateMessageParams){
    try {
        const chat_content = await privateContentModel.getBySenderId(params.senderId.toString());
        winston.info("content ",chat_content)
        const filteredContent = chat_content.filter((content : private_chat_content)=>content.privateChatId == params.privateChatId)
        return filteredContent;
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