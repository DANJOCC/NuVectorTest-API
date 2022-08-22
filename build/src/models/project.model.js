"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.project = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    client_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'clients', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    active: { type: Boolean, required: true },
    products_Id: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "products"
        }],
    activities_Id: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "activities"
        }]
});
exports.project = (0, mongoose_1.model)('projects', projectSchema);
