"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    provider: { type: String, required: true },
    socialid: { type: String }
}, {
    timestamps: true
});
exports.UserModel = (0, mongoose_1.model)('user', schema);
