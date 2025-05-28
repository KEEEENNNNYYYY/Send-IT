
import { pool } from '../config/db';
// import winston from 'winston'

export async function getAll(page:number,size:number){

    const limit = size;
    const offset = size*(page-1);
    const res = await pool.query('SELECT id , owner_id , creation_date from group_chat  limit $1 offset $2',[limit.toString(),offset.toString()])
    return res.rows[0];
}
