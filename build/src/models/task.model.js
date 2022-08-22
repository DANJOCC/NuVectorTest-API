"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
const mongoose_1 = require("mongoose");
const stackSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    billable: { type: Boolean, required: true },
    contractor_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'clients', required: true },
    client_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'clients', required: true },
    project_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'projects', required: true },
    product_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'products', required: true },
    activity_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'projects', required: true },
    category_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'projects', required: true }
});
exports.task = (0, mongoose_1.model)('projects', stackSchema);
