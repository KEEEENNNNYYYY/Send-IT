import winston from 'winston';
import {pool} from '../config/db';
import { private_chat } from '../types/private.chat.type';
import { getByNumericId } from './user.model';

export async function getByUsersNumericId(firstUserId : number , secondUserId : number){
    const values = [firstUserId.toString(),secondUserId.toString()]
    try {
        
        const query = 'SELECT id , first_user_id , second_user_id , creation_date from private_chat WHERE first_user_id = $1 AND second_user_id = $2 ';
        const res = await pool.query(query,values);
        const db_chat = res.rows[0];
        const first_user = await getByNumericId(db_chat.first_user_id);
        const second_user = await getByNumericId(db_chat.second_user_id);
        const chat : private_chat = {
            creation_date : db_chat.creation_date,
            first_user : first_user,
            second_user : second_user,
            id : db_chat.id
        }
        return chat
    } catch (error) {
        winston.log("",values.toString())
        
        winston.error("error",error);        
    }
}

export async function saveChat(privateChat : private_chat){
    try {
        
        const query = 'INSERT INTO private_chat (id,first_user_id,second_user_id,creation_date) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING RETURNING id,first_user_id,second_user_id,creation_date';
        const values = [privateChat.id,privateChat.first_user,privateChat.second_user,privateChat.creation_date];
        const res = await pool.query(query,values);
        return res.rows[0];
    } catch (error) {
        winston.error('error',error);
    }
}
