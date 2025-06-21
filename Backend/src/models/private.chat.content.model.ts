import { pool } from '../config/db';
import { Private_content_to_save } from '../types/private.chat.content';

export async function getBySenderId(sender_id: string) {
  const query =
    'SELECT id,private_chat_id,sender_id,content,sending_date FROM private_chat_content WHERE sender_id=$1 ';
  const values = [sender_id];
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function savePrivateContent(
  content_to_save: Private_content_to_save
) {
  const query =
    'INSERT INTO private_chat_content (id,private_chat_id,sender_id,content,sending_date) VALUES ($1,$2,$3,$4,$5) ON CONFLICT DO UPDATE SET content = excluded.content ';
    // un peu de mapping !
  const id = crypto.randomUUID();
  const sending_date = new Date();
  const chat_id = content_to_save.private_chat.id;
  const content = content_to_save.content;
  const sender_id = content_to_save.sender.id;
  const values = [id, chat_id, sender_id, content, sending_date];
  const res = await pool.query(query, values);
  return res.rows[0];
}
export async function getByChatId(private_chat_id : string ){
  const query ='SELECT id,private_chat_id,sender_id,content,sending_date FROM private_chat_content WHERE private_chat_id=$1'
  const values = [private_chat_id]
  const res = await pool.query(query,values)
  return res.rows[0]
}

export  const privateContentModel = {
  getBySenderId,
  getByChatId,
  savePrivateContent
}