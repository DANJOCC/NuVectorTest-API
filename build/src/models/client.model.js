"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const mongoose_1 = require("mongoose");
const clientsSchema = new mongoose_1.Schema({
    client: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    industry: { type: String, required: true },
    active: { type: Boolean, required: true },
    projects_id: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'projects' }]
});
exports.client = (0, mongoose_1.model)('clients', clientsSchema);
