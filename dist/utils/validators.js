"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// eslint-disable-next-line import/extensions
const user_type_1 = require("../types/user.type");
// eslint-disable-next-line import/prefer-default-export
class Validators {
}
exports.Validators = Validators;
Validators.checkEnv = (envVar) => {
    if (process.env[envVar])
        return process.env[envVar];
    throw new Error(`Please define the Enviroment variable ${envVar}`);
};
Validators.checkPassword = (user, plainPassword) => {
    if (user.provider === user_type_1.AUTH_PROVIDER.LOCAL && user.password) {
        return bcryptjs_1.default.compareSync(plainPassword, user.password);
    }
    throw new Error('You can only check the password for local registered users');
};
