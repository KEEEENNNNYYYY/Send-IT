"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import  app  from "../index";
const group_chat_controller_1 = require("../controllers/group.chat.controller");
// import app from "..";
// const app = express()
const router = (0, express_1.Router)();
router.get('/', group_chat_controller_1.getAllHandler);
exports.default = router;
