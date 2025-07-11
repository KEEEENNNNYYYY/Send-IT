"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});
const runAllSQLFiles = (directory) => __awaiter(void 0, void 0, void 0, function* () {
    const files = (0, fs_1.readdirSync)(directory)
        .filter(file => file.endsWith(".sql"))
        .sort(); // pour exécuter dans l'ordre alpha (01_, 02_, etc.)
    for (const file of files) {
        const fullPath = (0, path_1.join)(directory, file);
        const sql = (0, fs_1.readFileSync)(fullPath, "utf8");
        try {
            yield pool.query(sql);
            console.log(`✅ Executé : ${file}`);
        }
        catch (err) {
            console.error(`❌ Erreur dans ${file}`, err);
        }
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("⏳ Setup DB en cours...");
    // dir name eto le dossier misy an setup ie scripts
    const sqlFolder = (0, path_1.join)(__dirname, "../db/migration");
    yield runAllSQLFiles(sqlFolder);
    yield pool.end();
    console.log("✅ Setup terminé !");
});
main();
