"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.local_strategy = void 0;
/* eslint-disable max-len */
const passport_local_1 = require("passport-local");
const validators_1 = require("../../utils/validators");
const user_model_1 = require("../../models/user.model");
// eslint-disable-next-line camelcase
exports.local_strategy = new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield user_model_1.UserModel.findOne({ username });
    // DOC: http://www.passportjs.org/docs/configure/
    if (foundUser) {
        if (validators_1.Validators.checkPassword(foundUser, password)) {
            console.log('LOGIN OK');
            return done(null, foundUser);
        }
        return done(null, false, {
            message: 'Incorrect password'
        });
    }
    console.log('User not found');
    return done(null, false, {
        message: 'User not found'
    });
}));
