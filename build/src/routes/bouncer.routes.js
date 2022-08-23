"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bouncer = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const verification_1 = __importDefault(require("../middlewares/verification"));
const multer_1 = __importDefault(require("multer"));
const user_route = (0, express_1.Router)();
const data = (0, multer_1.default)();
user_route.post('/login', data.none(), controllers_1.login);
user_route.get('/info', verification_1.default, controllers_1.info);
exports.bouncer = user_route;
