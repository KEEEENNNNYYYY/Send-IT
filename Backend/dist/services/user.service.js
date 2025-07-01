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
exports.getUserByNumericId = getUserByNumericId;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.getAllUser = getAllUser;
const user_model_1 = require("../models/user.model");
const user_model_2 = require("../models/user.model");
const user_model_3 = require("../models/user.model");
function getUserByNumericId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = yield (0, user_model_1.getByNumericId)(id);
        return userInfo;
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = yield (0, user_model_1.getByUserId)(id);
        return userInfo;
    });
}
function createUser(id, first_name, last_name, birthday, email, location) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = yield (0, user_model_2.createUserQuery)(id, first_name, last_name, birthday, email, location);
        return userInfo;
    });
}
function getAllUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const userList = yield (0, user_model_3.getAll)();
        return userList;
    });
}
