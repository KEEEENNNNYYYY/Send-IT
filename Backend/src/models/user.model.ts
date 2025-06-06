import winston from "winston";
import { pool } from "../config/db";

export async function getByNumericId(id: number) {
  const query =
    "SELECT id,first_name,last_name,birthday,numeric_id ,location,creation_date from \"user\" where numeric_id = $1 ";
  try {
    const res = await pool.query(query, [id.toString()]);
    return res.rows[0];
  } catch (error) {
    winston.error("error", error);
  }
}




