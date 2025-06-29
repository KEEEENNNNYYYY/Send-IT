import winston from "winston";
import { getByUsersNumericId, saveChat } from "../models/private.chat.model";
import { privateChatToSave } from "../types/private.chat.type";

export const getByUsersNumericIds = async (
  first_user_id: number,
  second_user_id: number
) => {
  try {
    const first_id = Math.min(first_user_id, second_user_id);
    const second_id = Math.max(first_user_id, second_user_id);
    winston.level = "debug";
   // winston.info(first_id.toString());
   // winston.info(second_id.toString());
    const private_chat = await getByUsersNumericId(first_id, second_id);
    return private_chat;
  } catch (error) {
    winston.error("error", error);
  }
};

export const savePrivateChat = async (privateChatToSave: privateChatToSave) => {
  try {
    let firstUserId = privateChatToSave.firstUserId;
    let secondUserId = privateChatToSave.secondUserId;
    let privateChatComplete: privateChatToSave;
    // winston.info("user id 1",privateChatToSave.firstUserId)
    // winston.info("user id 2",secondUserId)
    if (
      privateChatToSave.firstUserId != null &&
      privateChatToSave.secondUserId != null
    ) {
      if (firstUserId < secondUserId) {
        firstUserId = privateChatToSave.firstUserId;
        secondUserId = privateChatToSave.secondUserId;
        privateChatComplete = {
          firstUserId: firstUserId,
          secondUserId: secondUserId,
        };
        return saveChat(privateChatComplete);
      }else{

        privateChatComplete = {
          firstUserId: secondUserId,
          secondUserId: firstUserId,
        };
        
        return saveChat(privateChatComplete);
      }
    }
  } catch (error) {
    winston.error("error", error);
  }
};
