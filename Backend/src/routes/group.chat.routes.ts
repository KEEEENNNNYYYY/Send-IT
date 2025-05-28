import { Router } from "express";
//import  app  from "../index";
import { getAllHandler } from "../controllers/group.chat.controller";
// import app from "..";
// const app = express()
const router = Router();


router.get('/',getAllHandler);

export default router;