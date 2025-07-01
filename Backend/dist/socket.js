"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = setupSocket;
const socket_io_1 = require("socket.io");
const private_chat_content_model_1 = require("./models/private.chat.content.model");
//@ts-expect-error type error
function setupSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*"
        }
    });
    io.on("connection", (socket) => {
        console.log("new client connected " + socket.id);
        // handleChatSocket(socket)
        socket.on("sendMessage", (data) => {
            console.log("💬 Nouveau message:", data);
            const content_to_save = {
                content: data.text,
                senderId: data.senderId,
                privateChatId: data.chatId
            };
            (0, private_chat_content_model_1.savePrivateContent)(content_to_save);
            io.emit("receiveMessage", data);
            socket.on("disconnect", () => {
                console.log(`client ${socket.id} disconnected`);
            });
        });
    });
}
