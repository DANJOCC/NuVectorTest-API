"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.project = void 0;
const express_1 = require("express");
const verification_1 = __importDefault(require("../middlewares/verification"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../controllers");
const project_route = (0, express_1.Router)();
const data = (0, multer_1.default)();
project_route.get('/getProjects/:id', verification_1.default, controllers_1.getProjects);
project_route.get('/getProject/:id', verification_1.default, controllers_1.getProject);
project_route.post('/newProject', verification_1.default, data.none(), controllers_1.newProject);
project_route.put('/updateProject', verification_1.default, data.none(), controllers_1.updateProject);
exports.project = project_route;
