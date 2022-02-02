"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Helper {
}
exports.Helper = Helper;
Helper.capitalizeStrings = (str) => str
    .trim()
    .split(' ')
    .map((e) => e.slice(0, 1).toUpperCase() + e.substring(1).toLowerCase())
    .join(' ');
Helper.hash = (pass) => bcryptjs_1.default.hashSync(pass, bcryptjs_1.default.genSaltSync(10));
