import express, { json } from "express";
import cors from "cors";
import { createServer } from "http";
import { pool } from "./config/db.js";
export const app = express();



app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("Send'IT API running on port 5000");
});

app.get('/ping', async (req,res)=>{

   const result = await pool.query('SELECT NOW()')
    res.json(result.rows[0]);

})
