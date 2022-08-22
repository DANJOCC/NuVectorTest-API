"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
    categories: [{ type: String }]
});
exports.activity = (0, mongoose_1.model)('activities', activitySchema);
