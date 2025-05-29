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

export async function createUserQuery(id: string, first_name: string, last_name: string, birthday: Date, location: string) {
  const query =
    "INSERT INTO \"user\" (id,first_name,last_name,birthday,location,creation_date) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id,first_name,last_name,birthday,numeric_id ,location,creation_date";
  try {
    const res = await pool.query(query, [
      id,
      first_name,
      last_name,
      birthday,
      location,
      new Date(),
    ]);
    return res.rows[0];
  } catch (error) {
    winston.error("error", error);
  }

}
