import { private_chat } from "./private.chat.type";
import { User } from "./user.type";

export interface Private_content_to_save {
    content : string ,
    senderId : number,
    privateChatId : string
}
export interface getPrivateMessageParams {
    senderId : number,
    privateChatId : string
}
