import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

const runAllSQLFiles = async (directory: string) => {
  const files = readdirSync(directory)
    .filter(file => file.endsWith(".sql"))
    .sort(); // pour exécuter dans l'ordre alpha (01_, 02_, etc.)

  for (const file of files) {
    const fullPath = join(directory, file);
    const sql = readFileSync(fullPath, "utf8");
    try {
      await pool.query(sql);
      console.log(`✅ Executé : ${file}`);
    } catch (err) {
      console.error(`❌ Erreur dans ${file}`, err);
    }
  }
};

const main = async () => {
  console.log("📂 __dirname:", __dirname);
  console.log("⏳ Setup DB en cours...");
  // dir name eto le dossier misy an setup ie scripts
  const sqlFolder = join(__dirname, "../../db/migration");
  console.log("📁 sqlFolder:", sqlFolder);
  await runAllSQLFiles(sqlFolder);
  await pool.end();
  console.log("✅ Setup terminé !");

};

main();
