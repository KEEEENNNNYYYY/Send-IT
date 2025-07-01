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
exports.privateContentModel = void 0;
exports.getBySenderId = getBySenderId;
exports.savePrivateContent = savePrivateContent;
const db_1 = require("../config/db");
function getBySenderId(sender_id, private_chat_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT id,private_chat_id,sender_id,content,sending_date FROM private_chat_content WHERE sender_id=$1 AND private_chat_id=$2";
        const values = [sender_id, private_chat_id];
        const res = yield db_1.pool.query(query, values);
        return res.rows;
    });
}
function savePrivateContent(content_to_save) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "INSERT INTO private_chat_content (id,private_chat_id,sender_id,content,sending_date) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO UPDATE SET content = excluded.content ";
        // un peu de mapping !
        const id = crypto.randomUUID();
        const sending_date = new Date();
        const chat_id = content_to_save.privateChatId;
        const content = content_to_save.content;
        const sender_id = content_to_save.senderId;
        const values = [id, chat_id, sender_id, content, sending_date];
        const res = yield db_1.pool.query(query, values);
        if (res.rowCount != null && res.rowCount >= 1) {
            return content_to_save;
        }
        else {
            throw new Error("cant create");
        }
    });
}
//
exports.privateContentModel = {
    getBySenderId,
    savePrivateContent,
};
