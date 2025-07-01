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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
const db_1 = require("../config/db");
// import winston from 'winston'
function getAll(page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        const limit = size;
        const offset = size * (page - 1);
        const res = yield db_1.pool.query('SELECT id , owner_id , creation_date from group_chat  limit $1 offset $2', [limit.toString(), offset.toString()]);
        return res.rows[0];
    });
}
