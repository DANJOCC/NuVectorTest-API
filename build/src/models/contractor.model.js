"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractor = void 0;
const mongoose_1 = require("mongoose");
const contractorSchema = new mongoose_1.Schema({
    code: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    birthyear: { type: String, required: true },
    country: { type: String, required: true },
    active: { type: Boolean, required: true },
});
exports.contractor = (0, mongoose_1.model)('contractors', contractorSchema);
