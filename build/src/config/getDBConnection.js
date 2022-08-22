"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URLcluster = process.env.MONGODBURL;
const connection = () => {
    try {
        if (typeof URLcluster !== 'undefined')
            mongoose_1.default.connect(URLcluster);
        else
            throw new Error("Cant Connect to Datadase, URL undefined");
    }
    catch (error) {
        console.log(error);
        process.exit(-1);
    }
    const bdConnection = mongoose_1.default.connection;
    return bdConnection;
};
exports.default = connection;
