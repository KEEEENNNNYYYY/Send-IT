import { Router } from "express";
import { getPrivateChatHandler,savePrivateChatHandler } from "../controllers/private.chat.controller";
import { getPrivateMessageHandler, savePrivateMessageHandler } from "../controllers/private.chat.content.controller";


const router = Router();

router.get('/',getPrivateChatHandler);
router.get('/content',getPrivateMessageHandler);
router.post('/:privateChatId',savePrivateMessageHandler)
router.post('/',savePrivateChatHandler)
export default router;