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
exports.getAllHandler = void 0;
const group_chat_service_1 = require("../services/group.chat.service");
const getAllHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const page = (_a = req.query.page) !== null && _a !== void 0 ? _a : 1;
    const size = (_b = req.query.size) !== null && _b !== void 0 ? _b : 10;
    const groupChats = yield (0, group_chat_service_1.getAllGroupChat)(page, size);
    res.json(groupChats);
});
exports.getAllHandler = getAllHandler;
