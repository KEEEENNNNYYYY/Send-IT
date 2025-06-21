import { private_chat } from "./private.chat.type";
import { User } from "./user.type";

export interface Private_content_to_save {
    content : string ,
    sender : User,
    sending_date : Date,
    private_chat : private_chat 
}
export interface getBySenderIdParams {
    senderId : number
}