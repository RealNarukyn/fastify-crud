"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    category: { type: String, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true
});
exports.CategoryModel = (0, mongoose_1.model)('Category', CategorySchema);
