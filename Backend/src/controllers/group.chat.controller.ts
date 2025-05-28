import { NextFunction, Request, Response } from "express";
import { getAllGroupChat } from "../services/group.chat.service";
import { PaginationQueryParams } from "../types/queryParams.type";

export const getAllHandler = async (
  req: Request<{}, {}, {}, PaginationQueryParams>,
  res: Response,
  next: NextFunction
) => {
  const page = req.query.page ?? 1;
  const size = req.query.size ?? 10;
  const groupChats = await getAllGroupChat(page, size);
  res.json(groupChats);
};
