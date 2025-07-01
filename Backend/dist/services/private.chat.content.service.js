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
exports.getPrivateMessage = getPrivateMessage;
exports.saveContent = saveContent;
const winston_1 = __importDefault(require("winston"));
const private_chat_content_model_1 = require("../models/private.chat.content.model");
function getPrivateMessage(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chat_content = yield private_chat_content_model_1.privateContentModel.getBySenderId(params.senderId.toString(), params.privateChatId.toString());
            // winston.info("content ",chat_content)
            return chat_content.map((content) => ({
                id: content.id,
                timestamp: content.sending_date,
                text: content.content
            }));
        }
        catch (error) {
            winston_1.default.error("error :" + error);
        }
    });
}
function saveContent(content_to_save) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const savedContent = yield private_chat_content_model_1.privateContentModel.savePrivateContent(content_to_save);
            return savedContent;
        }
        catch (error) {
            winston_1.default.error("error", error);
        }
    });
}
