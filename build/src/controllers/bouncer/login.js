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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = exports.login = void 0;
const models_1 = require("../../models");
const auth_1 = require("../../auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!(typeof email !== 'undefined' && typeof password !== 'undefined')) {
            res.status(400).send("fill all inputs");
            return;
        }
        const person = yield models_1.user.findOne({ email });
        if (person === null) {
            res.status(404).send({ msg: "user not found" });
            return;
        }
        if (!bcrypt_1.default.compareSync(password, person.password)) {
            res.status(404).send({ msg: 'wrong password' });
            return;
        }
        const isAdmin = yield models_1.admin.findById(person._id);
        if (isAdmin === null) {
            const token = yield (0, auth_1.sign)({ id: person._id, logged: true, username: person.username, role: 'CONTRACTOR' });
            res.status(200).send({ token });
            return;
        }
        const token = yield (0, auth_1.sign)({ id: person._id, logged: true, username: person.username, role: 'ADMIN' });
        res.status(200).send({ token });
    });
}
exports.login = login;
function info(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        if (!(typeof email !== 'undefined')) {
            res.status(401).send("fill all inputs");
            return;
        }
        const person = yield models_1.user.findOne({ email });
        if (person === null) {
            res.status(400).send("user not found");
            return;
        }
        res.status(200).send({ info: person });
    });
}
exports.info = info;
