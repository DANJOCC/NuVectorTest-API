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
exports.getClient = exports.getActiveClientNames = void 0;
const models_1 = require("../../models");
function getActiveClientNames(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const client_Names = [];
        try {
            const clients = yield models_1.client.find({ active: true });
            clients.map((value) => {
                client_Names.push({ id: value._id, name: value.name });
            });
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: 'there was a error, please try again later' });
            return;
        }
        res.status(200).send({ names: client_Names });
    });
}
exports.getActiveClientNames = getActiveClientNames;
function getClient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        let theClient;
        try {
            const aClient = yield models_1.client.findById(id);
            if (aClient === null) {
                res.status(404).send({ msg: 'client not found' });
                return;
            }
            theClient = aClient;
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: 'there was a error, please try again later' });
            return;
        }
        res.status(200).send({ client_Name: theClient.name });
    });
}
exports.getClient = getClient;
