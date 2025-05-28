import winston from "winston";
import { getByUsersNumericId } from "../models/private.chat.model"


export const getByUsersNumericIds = async (first_user_id:number, second_user_id:number)=>{

    try {
       const first_id = Math.min(first_user_id,second_user_id);
       const second_id = Math.max(first_user_id,second_user_id)
       winston.level = 'debug';
       winston.info(first_id.toString())
       winston.info(second_id.toString())
        const private_chat = await getByUsersNumericId(first_id,second_id);
        return private_chat;
    } catch (error) {
      winston.error("error",error)
    }


}