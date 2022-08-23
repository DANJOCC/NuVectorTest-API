"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const verification_1 = __importDefault(require("../middlewares/verification"));
const task_route = (0, express_1.Router)();
task_route.get('/tasks/:name/:filter', verification_1.default, controllers_1.getTasksFilter);
exports.task = task_route;
