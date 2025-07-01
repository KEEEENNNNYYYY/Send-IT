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
exports.getByUsersNumericId = getByUsersNumericId;
exports.saveChat = saveChat;
const winston_1 = __importDefault(require("winston"));
const db_1 = require("../config/db");
const user_model_1 = require("./user.model");
function getByUsersNumericId(firstUserId, secondUserId) {
    return __awaiter(this, void 0, void 0, function* () {
        const values = [firstUserId.toString(), secondUserId.toString()];
        try {
            const query = "SELECT id , first_user_id , second_user_id , creation_date from private_chat WHERE first_user_id = $1 AND second_user_id = $2 ";
            const res = yield db_1.pool.query(query, values);
            const db_chat = res.rows[0];
            const first_user = yield (0, user_model_1.getByNumericId)(db_chat.first_user_id);
            const second_user = yield (0, user_model_1.getByNumericId)(db_chat.second_user_id);
            const chat = {
                creation_date: db_chat.creation_date,
                first_user: first_user,
                second_user: second_user,
                id: db_chat.id,
            };
            return chat;
        }
        catch (error) {
            // winston.log("", values.toString());
            winston_1.default.error("error", error);
        }
    });
}
function saveChat(privateChat) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "INSERT INTO private_chat (id,first_user_id,second_user_id,creation_date) VALUES ($1,$2,$3,$4) ";
            const privateChatToSave = {
                id: crypto.randomUUID(),
                first_user: privateChat.firstUserId,
                second_user: privateChat.secondUserId,
                creation_date: new Date(),
            };
            const values = [
                privateChatToSave.id,
                privateChatToSave.first_user,
                privateChatToSave.second_user,
                privateChatToSave.creation_date,
            ];
            const res = yield db_1.pool.query(query, values);
            if (res.rowCount != null && res.rowCount >= 1) {
                return privateChatToSave;
            }
            else {
                throw new Error("can't save");
            }
        }
        catch (error) {
            //@ts-expect-error error have message
            winston_1.default.error("error", error.message);
        }
    });
}
