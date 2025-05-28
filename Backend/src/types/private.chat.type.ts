import { User } from "./user.type";

export interface private_chat {
    id : string,
    first_user : User,
    second_user : User,
    creation_date : Date
};