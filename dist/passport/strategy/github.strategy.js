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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.github_strategy = void 0;
const passport_github2_1 = require("passport-github2");
const config_1 = __importDefault(require("../../config"));
const user_domain_1 = require("../../domain/user.domain");
// eslint-disable-next-line camelcase
exports.github_strategy = new passport_github2_1.Strategy({
    clientID: config_1.default.GITHUB.CLIENT_ID,
    clientSecret: config_1.default.GITHUB.CLIENT_SECRET,
    callbackURL: config_1.default.GITHUB.CALLBACK
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(profile);
    try {
        let user = yield (0, user_domain_1.searchGitHubUser)(profile.id);
        if (!user) {
            // FIRST TIME
            console.log('FIRST TIME GITHUB USER');
            const { username } = profile;
            const email = profile.emails[0].value;
            user = yield (0, user_domain_1.createUserGitHub)(username, email, profile.id);
        }
        done(null, user);
    }
    catch (error) {
        console.log('GITHUB STRATEGY LOGIN ERROR:', error);
        // This email is already registered
        done(null, false, {
            message: 'User already in the system, please login with a different option'
        });
    }
}));
