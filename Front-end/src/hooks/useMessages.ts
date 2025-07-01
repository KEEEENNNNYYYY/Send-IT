import { useEffect, useState } from "react";
import { Message } from "../types/Message";
import axios from "axios";
import { socket } from "../socket";
import { api_url } from "../api/chat";

export const useChatMessages = (
  chatId: string | undefined,
  userId: number | undefined,
  contactId: number | undefined
) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!chatId) return;

        const resSent = await axios.get(
          api_url+"/api/chat/content",
          {
            params: { senderId: userId, privateChatId: chatId },
          }
        );
        const resReceived = await axios.get(
          api_url+"/api/chat/content",
          {
            params: { senderId: contactId, privateChatId: chatId },
          }
        );

        const sent = resSent.data.map((msg: any) => ({ ...msg, type: "sent" }));
        const received = resReceived.data.map((msg: any) => ({
          ...msg,
          type: "received",
        }));

        setMessages(
          [...sent, ...received].sort(
            (a, b) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [chatId, userId, contactId]);
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      console.log("💬 Nouveau message reçu :",msg);
      const savedMessage = {...msg,type : msg.senderId == userId?"sent":"received"}
     setMessages((prev)=>[...prev,savedMessage]);
    });
    return ()=>{
        socket.off("receiveMessage")
    }
  },[chatId]);

  return messages;
};
