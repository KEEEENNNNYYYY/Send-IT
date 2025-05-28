import { Request, Response, NextFunction } from "express";
import { getUserByNumericId } from "../services/user.service";

export const getUserProfil = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const userInfo = await getUserByNumericId(id);
    res.json(userInfo);
};
