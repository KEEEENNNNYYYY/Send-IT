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
exports.getAllUserHandler = exports.userCreation = exports.getUserByIdHandler = exports.getUserProfil = void 0;
const user_service_1 = require("../services/user.service");
const user_service_2 = require("../services/user.service");
const user_service_3 = require("../services/user.service");
const getUserProfil = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    const userInfo = yield (0, user_service_1.getUserByNumericId)(id);
    res.json(userInfo);
});
exports.getUserProfil = getUserProfil;
const getUserByIdHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Missing user ID" });
        }
        const userInfo = yield (0, user_service_1.getUserById)(id);
        if (!userInfo) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(userInfo);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserByIdHandler = getUserByIdHandler;
const userCreation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, first_name, last_name, birthday, email, location } = req.body;
        if (!id || !first_name || !last_name || !birthday || !email) {
            return res.status(400).json({ error: "Champs requis manquants" });
        }
        const birthdayDate = new Date(birthday);
        if (isNaN(birthdayDate.getTime())) {
            return res.status(400).json({ error: "Date d'anniversaire invalide" });
        }
        const newUser = yield (0, user_service_2.createUser)(id, first_name, last_name, birthdayDate, email, location);
        return res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.userCreation = userCreation;
const getAllUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield (0, user_service_3.getAllUser)();
        res.json(userList);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUserHandler = getAllUserHandler;
