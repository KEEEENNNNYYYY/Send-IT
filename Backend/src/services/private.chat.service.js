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
exports.savePrivateChat = exports.getByUsersNumericIds = void 0;
const winston_1 = __importDefault(require("winston"));
const private_chat_model_1 = require("../models/private.chat.model");
const getByUsersNumericIds = (first_user_id, second_user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const first_id = Math.min(first_user_id, second_user_id);
        const second_id = Math.max(first_user_id, second_user_id);
        const private_chat = yield (0, private_chat_model_1.getByUsersNumericId)(first_id, second_id);
        return private_chat;
    }
    catch (error) {
        winston_1.default.error("error", error);
    }
});
exports.getByUsersNumericIds = getByUsersNumericIds;
const savePrivateChat = (privateChatToSave) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let firstUserId = privateChatToSave.firstUserId;
        let secondUserId = privateChatToSave.secondUserId;
        let privateChatComplete;
        // winston.info("user id 1",privateChatToSave.firstUserId)
        // winston.info("user id 2",secondUserId)
        if (privateChatToSave.firstUserId != null &&
            privateChatToSave.secondUserId != null) {
            if (firstUserId < secondUserId) {
                firstUserId = privateChatToSave.firstUserId;
                secondUserId = privateChatToSave.secondUserId;
                privateChatComplete = {
                    firstUserId: firstUserId,
                    secondUserId: secondUserId,
                };
                return (0, private_chat_model_1.saveChat)(privateChatComplete);
            }
            else {
                privateChatComplete = {
                    firstUserId: secondUserId,
                    secondUserId: firstUserId,
                };
                return (0, private_chat_model_1.saveChat)(privateChatComplete);
            }
        }
    }
    catch (error) {
        winston_1.default.error("error", error);
    }
});
exports.savePrivateChat = savePrivateChat;
