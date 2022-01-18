"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
class Helper {
}
exports.Helper = Helper;
Helper.capitalizeStrings = (str) => {
    return str
        .trim()
        .split(' ')
        .map((e) => e.slice(0, 1).toUpperCase() + e.substring(1).toLowerCase())
        .join(' ');
};
