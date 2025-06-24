import { Router } from "express";
import { getPrivateMessageHandler } from "../controllers/private.chat.content.controller";

const router = Router();

router.get('/',getPrivateMessageHandler);
export default router;