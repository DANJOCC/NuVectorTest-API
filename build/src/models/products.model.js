"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
});
exports.product = (0, mongoose_1.model)('products', productSchema);
