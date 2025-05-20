const express = require('express');
const cors = require("cors");
const http = require("http");

const app = express();
const PORT = 5000;
const server = http.createServer(app);


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Send'IT API running on port 5000");
});

server.listen(PORT, () => {
    console.log(`server running on : http://localhost:${PORT}`);
});