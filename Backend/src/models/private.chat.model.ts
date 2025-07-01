import winston from "winston";
import { pool } from "../config/db";
import { privateChat, privateChatToSave } from "../types/private.chat.type";
import { getByNumericId } from "./user.model";
import crypto from "crypto"
export async function getByUsersNumericId(
  firstUserId: number,
  secondUserId: number
) {
  const values = [firstUserId.toString(), secondUserId.toString()];
  try {
    const query =
      "SELECT id , first_user_id , second_user_id , creation_date from private_chat WHERE first_user_id = $1 AND second_user_id = $2 ";
    const res = await pool.query(query, values);
    const db_chat = res.rows[0];
    const first_user = await getByNumericId(db_chat.first_user_id);
    const second_user = await getByNumericId(db_chat.second_user_id);
    const chat: privateChat = {
      creation_date: db_chat.creation_date,
      first_user: first_user,
      second_user: second_user,
      id: db_chat.id,
    };
    return chat;
  } catch (error) {
    // winston.log("", values.toString());

    winston.error("error", error);
  }
}

export async function saveChat(privateChat: privateChatToSave) {
  try {
    const query =
      "INSERT INTO private_chat (id,first_user_id,second_user_id,creation_date) VALUES ($1,$2,$3,$4) ";

    const privateChatToSave = {
      id: crypto.randomUUID(),
      first_user: privateChat.firstUserId,
      second_user: privateChat.secondUserId,
      creation_date: new Date(),
    };

    const values = [
      privateChatToSave.id,
      privateChatToSave.first_user,
      privateChatToSave.second_user,
      privateChatToSave.creation_date,
    ];
    const res = await pool.query(query, values);
    if (res.rowCount != null && res.rowCount >= 1) {
      return privateChatToSave;
    } else {
      throw new Error("can't save");
    }
  } catch (error) {
    //@ts-expect-error error have message
    winston.error("error", error.message);
  }
}
