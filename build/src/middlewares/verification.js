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
const express_1 = require("express");
const auth_1 = require("../auth");
const verification = (0, express_1.Router)();
verification.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers['authorization'];
    if (typeof token === 'undefined') {
        res.status(400).send({
            error: 'authorization token is needed'
        });
        return;
    }
    if (!token.startsWith('Bearer ')) {
        res.status(400).send({
            error: 'Bad authorization header'
        });
        return;
    }
    token = token.split(' ')[1];
    const pass = yield (0, auth_1.verify)(token);
    if (!pass) {
        res.status(400).send({
            error: 'Permission Denied'
        });
        return;
    }
    next();
}));
exports.default = verification;
