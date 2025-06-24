import groupChatRoutes from "./routes/group.chat.routes";
import privateChatRoutes from "./routes/private.chat.routes"
import userRoutes from "./routes/user.routes";
import { json } from "express";
import cors from "cors";
import express from "express"
const app = express();
const port = process.env.PORT;



app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("Send'IT API running on port 5000");
});

app.use('/api/group',groupChatRoutes)
app.use('/api/chat',privateChatRoutes)
app.use('/api/users', userRoutes);
app.listen(port,()=> console.log(`server running on : ${port}`));

export default app;