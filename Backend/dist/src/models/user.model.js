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
exports.getByNumericId = getByNumericId;
exports.createUserQuery = createUserQuery;
exports.getAll = getAll;
exports.getByUserId = getByUserId;
const winston_1 = __importDefault(require("winston"));
const db_1 = require("../config/db");
function getByNumericId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT id,first_name,last_name,birthday,numeric_id ,location,creation_date from \"user\" where numeric_id = $1 ";
        try {
            const res = yield db_1.pool.query(query, [id.toString()]);
            return res.rows[0];
        }
        catch (error) {
            winston_1.default.error("error", error);
        }
    });
}
function createUserQuery(id, first_name, last_name, birthday, email, location) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'INSERT INTO "user" (id, first_name, last_name, birthday, email, location, creation_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, first_name, last_name, birthday, email, numeric_id, location, creation_date';
        try {
            const res = yield db_1.pool.query(query, [
                id,
                first_name,
                last_name,
                birthday,
                email,
                location,
                new Date(),
            ]);
            return res.rows[0];
        }
        catch (error) {
            winston_1.default.error("error", error);
        }
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT id,first_name,last_name,birthday,numeric_id ,location,creation_date from \"user\" ";
        try {
            const res = yield db_1.pool.query(query);
            return res.rows;
        }
        catch (error) {
            winston_1.default.error("error", error);
        }
    });
}
function getByUserId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT id, first_name, last_name, birthday, email, numeric_id, location, creation_date FROM "user" WHERE id = $1';
        try {
            const res = yield db_1.pool.query(query, [id]);
            return res.rows[0];
        }
        catch (error) {
            winston_1.default.error("error", error);
        }
    });
}
