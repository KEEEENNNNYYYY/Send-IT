import { io } from "socket.io-client"
import { api_url } from "./api/chat";



export const socket = io(api_url,{
    transports:["websocket"]
});