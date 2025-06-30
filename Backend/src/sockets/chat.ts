import { Socket, DefaultEventsMap } from "socket.io";
import { savePrivateContent } from "../models/private.chat.content.model";
import { Private_content_to_save } from "../types/private.chat.content.type";

export function handleChatSocket(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  socket.on("sendMessage", (data: any) => {
    console.log("💬 Nouveau message:", data);
    const content_to_save: Private_content_to_save = {
      content: data.text,
      senderId: data.senderId,
      privateChatId: data.chatId,
    };
    savePrivateContent(content_to_save);
    socket.emit("receiveMessage", { ...data, timestamp: data.timestamp });
  });
}
