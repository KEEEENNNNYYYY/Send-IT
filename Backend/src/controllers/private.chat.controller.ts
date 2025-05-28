import { NextFunction, Request,Response } from "express"
import { PrivateChatQueryParams } from "../types/queryParams.type"
import { getByUsersNumericIds } from "../services/private.chat.service";


export const getPrivateChatHandler = async (req : Request<{},{},{},PrivateChatQueryParams>,res : Response,next : NextFunction)=>{

    const first_id = req.query.first_user_id;
    const second_id = req.query.second_user_id;

    const private_chat = await getByUsersNumericIds(first_id,second_id);

    res.json(private_chat);

}
