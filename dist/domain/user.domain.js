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
exports.deleteUser = exports.searchGitHubUser = exports.createUserGitHub = exports.createUserLocal = void 0;
const user_model_1 = require("../models/user.model");
const user_type_1 = require("../types/user.type");
const helper_1 = require("../utils/helper");
const createUserLocal = (username, email, plainPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const password = helper_1.Helper.hash(plainPassword);
    const userDoc = yield user_model_1.UserModel.create({
        username, email, password, provider: user_type_1.AUTH_PROVIDER.LOCAL
    });
    return userDoc;
});
exports.createUserLocal = createUserLocal;
// eslint-disable-next-line max-len
const createUserGitHub = (username, email, githubID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.create({
        username, email, socialid: githubID, provider: user_type_1.AUTH_PROVIDER.GITHUB
    });
});
exports.createUserGitHub = createUserGitHub;
// eslint-disable-next-line max-len
const searchGitHubUser = (githubID) => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.UserModel.findOne({ socialid: githubID, provider: user_type_1.AUTH_PROVIDER.GITHUB }); });
exports.searchGitHubUser = searchGitHubUser;
const deleteUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield user_model_1.UserModel.findOneAndDelete({ username });
    if (deleted) {
        console.log(`💀 User ${deleted.username} has been deleted`);
        return true;
    }
    console.log(`There's no user with username ${username} to be deleted`);
    return false;
});
exports.deleteUser = deleteUser;
