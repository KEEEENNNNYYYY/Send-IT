"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get('/all', user_controller_1.getAllUserHandler);
//@ts-expect-error may be error
router.get('/by-id/:id', user_controller_1.getUserByIdHandler);
//@ts-expect-error may be error
router.get('/:id', user_controller_1.getUserProfil);
//@ts-expect-error may be error
router.post('/', user_controller_1.userCreation);
exports.default = router;
