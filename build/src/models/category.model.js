"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
});
exports.category = (0, mongoose_1.model)('categories', categorySchema);
