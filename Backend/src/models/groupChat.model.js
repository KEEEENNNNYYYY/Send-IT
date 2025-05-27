
import { pool } from '../config/db.js';


export async function getAll(page,size){

    const limit = size;
    const offset = size*(page-1);
    const res = await pool.query('SELECT id , owner_id , creation_date from group_chat limit=$1 offset=$2',[limit,offset])
    return res.rows[0];
}
