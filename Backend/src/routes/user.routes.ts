import { Router } from "express";
import { getUserProfil, userCreation , getAllUserHandler } from "../controllers/user.controller";

const router = Router();


router.get('/all',getAllUserHandler)
// @ts-ignore
router.get('/:id', getUserProfil);
// @ts-ignore
router.post('/', userCreation);


export default router;
