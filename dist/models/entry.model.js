"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryModel = void 0;
const mongoose_1 = require("mongoose");
const EntrySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }
}, {
    timestamps: true
});
exports.EntryModel = (0, mongoose_1.model)('Entry', EntrySchema);
