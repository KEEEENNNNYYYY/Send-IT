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
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePrivateMessageHandler = exports.getPrivateMessageHandler = void 0;
const private_chat_content_service_1 = require("../services/private.chat.content.service");
const getPrivateMessageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query;
        const content = yield (0, private_chat_content_service_1.getPrivateMessage)(params);
        res.json(content);
    }
    catch (error) {
        next(error);
    }
});
exports.getPrivateMessageHandler = getPrivateMessageHandler;
const savePrivateMessageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const privateChatId = req.params.privateChatId;
        const messageBody = req.body;
        const content_to_save = Object.assign(Object.assign({}, messageBody), { privateChatId: privateChatId });
        const response = yield (0, private_chat_content_service_1.saveContent)(content_to_save);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.savePrivateMessageHandler = savePrivateMessageHandler;
