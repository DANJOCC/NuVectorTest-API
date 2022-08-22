"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    projects: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "projects"
        }]
});
exports.admin = (0, mongoose_1.model)('Admin', adminSchema);
