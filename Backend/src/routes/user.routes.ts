import { Router } from "express";
import { getUserProfil } from "../controllers/user.controller";

const router = Router();

router.get('/:id', getUserProfil);

export default router;
