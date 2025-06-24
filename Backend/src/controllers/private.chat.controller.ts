import { NextFunction, Request, Response } from "express";
import { PrivateChatQueryParams } from "../types/queryParams.type";
import {
  getByUsersNumericIds,
  savePrivateChat,
} from "../services/private.chat.service";
import { privateChatToSave } from "../types/private.chat.type";

export const getPrivateChatHandler = async (
  req: Request<{}, {}, {}, PrivateChatQueryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const first_id = req.query.first_user_id;
    const second_id = req.query.second_user_id;

    const private_chat = await getByUsersNumericIds(first_id, second_id);

    res.json(private_chat);
  } catch (error) {
    next(error);
  }
};

export const savePrivateChatHandler = async (
  req: Request<{}, {}, privateChatToSave>,
  res: Response,
  next: NextFunction
) => {
  try {
    const privateChat = req.body;

    const savedChat = await savePrivateChat(privateChat);
    res.json(savedChat);
  } catch (error) {
    next(error);
  }
};
