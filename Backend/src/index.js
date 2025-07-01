"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const group_chat_routes_1 = __importDefault(require("./routes/group.chat.routes"));
const private_chat_routes_1 = __importDefault(require("./routes/private.chat.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const express_2 = __importDefault(require("express"));
const http_1 = require("http");
const socket_1 = require("./socket");
const app = (0, express_2.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.get("/", (req, res) => {
    res.send("Send'IT API running on port 5000");
});
app.use("/api/group", group_chat_routes_1.default);
app.use("/api/chat", private_chat_routes_1.default);
app.use("/api/users", user_routes_1.default);
const server = (0, http_1.createServer)(app);
(0, socket_1.setupSocket)(server);
server.listen(port, () => console.log(`server running on : ${port}`));
exports.default = app;
