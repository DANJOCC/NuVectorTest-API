"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
const mongoose_1 = require("mongoose");
const stackSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    billable: { type: Boolean, required: true },
    contractor_name: { type: String, },
    client_name: { type: String, },
    project_name: { type: String, },
    product_name: { type: String, },
    activity_name: { type: String, },
    category_name: { type: String, }
});
exports.task = (0, mongoose_1.model)('tasks', stackSchema);
