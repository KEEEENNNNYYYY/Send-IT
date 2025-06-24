import { User } from "./user.type";

export interface private_chat {
    id : string,
    first_user : User,
    second_user : User,
    creation_date : Date
};
export interface private_chat_content{
    id : string,
    private_chat_id : string,
    sender_id : number,
    content : string,
    sending_date : Date
}