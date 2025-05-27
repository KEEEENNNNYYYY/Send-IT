import { NextFunction, Request, Response } from "express";
import { getAllGroupChat } from "../services/groupChat.service";
import { groupsQueryParams } from "../types/queryParams.type";

export const getAllHandler = async (
  req: Request<{}, {}, {}, groupsQueryParams>,
  res: Response,
  next: NextFunction
) => {
  const page = req.query.page ?? 1;
  const size = req.query.size ?? 10;
  const groupChats = await getAllGroupChat(page, size);
  console.log(groupChats);
  
  res.json(groupChats);
};
