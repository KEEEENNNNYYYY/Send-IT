import { Router } from "express";
import {
    getUserProfil,
    getUserByIdHandler,
    userCreation,
    getAllUserHandler
} from "../controllers/user.controller";

const router = Router();

router.get('/all', getAllUserHandler);

router.get('/by-id/:id', getUserByIdHandler);

router.get('/:id', getUserProfil);

router.post('/', userCreation);

export default router;
