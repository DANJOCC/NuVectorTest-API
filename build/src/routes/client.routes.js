"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const verification_1 = __importDefault(require("../middlewares/verification"));
const client_route = (0, express_1.Router)();
client_route.get('/getClient/:id', verification_1.default, controllers_1.getClient);
client_route.get('/getClientsNames', verification_1.default, controllers_1.getActiveClientNames);
exports.client = client_route;
