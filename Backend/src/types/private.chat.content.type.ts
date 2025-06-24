export interface Private_content_to_save {
    content : string ,
    senderId : number,
    privateChatId : string
}
export interface getPrivateMessageParams {
    senderId : number,
    privateChatId : string
}
export interface private_chat_content{
    id : string,
    privateChatId : string,
    senderId : number,
    content : string,
    sendingDate : Date
}