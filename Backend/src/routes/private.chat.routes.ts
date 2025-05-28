import { Router } from "express";
import { getPrivateChatHandler } from "../controllers/private.chat.controller";


const router = Router();

router.get('/',getPrivateChatHandler);

export default router;