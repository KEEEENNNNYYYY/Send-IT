import { Router } from "express";
import { getUserProfil, userCreation } from "../controllers/user.controller";

const router = Router();

// @ts-ignore
router.get('/:id', getUserProfil);
// @ts-ignore
router.post('/', userCreation);

export default router;
