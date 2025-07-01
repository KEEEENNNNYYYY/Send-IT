"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChatSocket = handleChatSocket;
const private_chat_content_model_1 = require("../models/private.chat.content.model");
function handleChatSocket(socket) {
    socket.on("sendMessage", (data) => {
        console.log("💬 Nouveau message:", data);
        const content_to_save = {
            content: data.text,
            senderId: data.senderId,
            privateChatId: data.chatId,
        };
        (0, private_chat_content_model_1.savePrivateContent)(content_to_save);
        socket.emit("receiveMessage", Object.assign(Object.assign({}, data), { timestamp: data.timestamp }));
    });
}
