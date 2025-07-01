import { Request, Response, NextFunction } from "express";
import { getUserByNumericId, getUserById } from "../services/user.service";
import { createUser } from "../services/user.service";
import { getAllUser } from "../services/user.service";

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

export const getUserByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Missing user ID" });
        }

        const userInfo = await getUserById(id);

        if (!userInfo) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json(userInfo);
    } catch (error) {
        next(error);
    }
};

export const userCreation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id, first_name, last_name, birthday, email, location } = req.body;

        if (!id || !first_name || !last_name || !birthday || !email) {
            return res.status(400).json({ error: "Champs requis manquants" });
        }
        const birthdayDate = new Date(birthday);
        if (isNaN(birthdayDate.getTime())) {
            return res.status(400).json({ error: "Date d'anniversaire invalide" });
        }

        const newUser = await createUser(id, first_name, last_name, birthdayDate, email, location);
        return res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

export const getAllUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userList = await getAllUser();
        res.json(userList);
        
    } catch (error) {
        next(error)
    }
};
