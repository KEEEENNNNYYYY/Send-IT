import { User } from "./user.type";

export interface privateChat {
    id : string,
    first_user : User,
    second_user : User,
    creation_date : Date
};

export interface privateChatToSave{
    firstUserId : number,
    secondUserId : number
}
