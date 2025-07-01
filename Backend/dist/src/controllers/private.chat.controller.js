"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePrivateChatHandler = exports.getPrivateChatHandler = void 0;
const private_chat_service_1 = require("../services/private.chat.service");
const winston_1 = __importDefault(require("winston"));
const getPrivateChatHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const first_id = req.query.first_user_id;
        const second_id = req.query.second_user_id;
        const private_chat = yield (0, private_chat_service_1.getByUsersNumericIds)(first_id, second_id);
        // winston.info("returns",private_chat)
        res.json(private_chat);
    }
    catch (error) {
        next(error);
    }
});
exports.getPrivateChatHandler = getPrivateChatHandler;
const savePrivateChatHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const privateChat = req.body;
        const savedChat = yield (0, private_chat_service_1.savePrivateChat)(privateChat);
        winston_1.default.info("body", savedChat);
        res.json(savedChat);
    }
    catch (error) {
        next(error);
    }
});
exports.savePrivateChatHandler = savePrivateChatHandler;
