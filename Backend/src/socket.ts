import { Server } from "socket.io";
import { savePrivateContent } from "./models/private.chat.content.model";
import { Private_content_to_save } from "./types/private.chat.content.type";

//@ts-expect-error type error
export function setupSocket(server){
    const io = new Server(server,{
  cors : {
    origin : "*",
    methods:["GET","POST"]
  }
})

    io.on("connection",(socket)=>{
        console.log("new client connected "+socket.id);

        // handleChatSocket(socket)
         socket.on("sendMessage", (data: any) => {
    console.log("💬 Nouveau message:", data);
    const content_to_save :Private_content_to_save = {
        content: data.text,
        senderId: data.senderId,
        privateChatId: data.chatId
    }
    savePrivateContent(content_to_save)
    io.emit("receiveMessage", data);
    
        
        socket.on("disconnect",()=>{
            console.log(`client ${socket.id} disconnected`);
        })

    })
})
}