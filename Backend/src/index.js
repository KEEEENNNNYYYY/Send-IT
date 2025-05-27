import express, { json } from 'express';
import cors from "cors";
import { createServer } from "http";
import {pool} from './config/db';
const app = express();
const PORT = 5000;
const server = createServer(app);


app.use(cors());
app.use(json());

app.get('/', (req, res) => {
    res.send("Send'IT API running on port 5000");
});

app.get('/ping', async (req,res)=>{
    
   const result = await pool.query('SELECT NOW()')
    
    res.json(result.rows[0]);

    
})
    server.listen(PORT, () => {
    console.log(`server running on : http://localhost:${PORT}`);
});