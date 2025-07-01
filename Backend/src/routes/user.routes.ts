import { Router } from "express";
import {
    getUserProfil,
    getUserByIdHandler,
    userCreation,
    getAllUserHandler
} from "../controllers/user.controller";

const router = Router();

router.get('/all', getAllUserHandler);

//@ts-expect-error may be error
router.get('/by-id/:id', getUserByIdHandler);

//@ts-expect-error may be error
router.get('/:id', getUserProfil);

//@ts-expect-error may be error
router.post('/', userCreation);

export default router;
