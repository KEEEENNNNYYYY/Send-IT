import express, { json } from "express";
import cors from "cors";
import { createServer } from "http";

import groupChatRoutes from "./routes/groupChat.routes";
 const app = express();
const port = process.env.PORT;



app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("Send'IT API running on port 5000");
});

app.use('/api/groups',groupChatRoutes)

app.listen(port,()=> console.log(`server running on : ${port}`));

export default app;