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
const fastify_passport_1 = __importDefault(require("fastify-passport"));
// -- My Controllers
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const authRouter = (app) => __awaiter(void 0, void 0, void 0, function* () {
    // -- [ GET Routers ]
    app.get('/login', auth_controller_1.default.loginView);
    app.get('/signup', auth_controller_1.default.signupView);
    app.get('/logout', auth_controller_1.default.logout);
    // -- [ GET GitHub Login]
    app.get('/github', fastify_passport_1.default.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }));
    app.get('/github/callback', fastify_passport_1.default.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
    // -- [ POST Routers ]
    app.post('/login', {
        preValidation: fastify_passport_1.default.authenticate('local', {
            session: true
        })
    }, auth_controller_1.default.login);
    app.post('/signup', auth_controller_1.default.signup);
});
exports.default = authRouter;
