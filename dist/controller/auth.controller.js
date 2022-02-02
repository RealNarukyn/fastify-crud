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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_domain_1 = require("../domain/user.domain");
class AuthController {
}
_a = AuthController;
AuthController.loginView = (request, reply) => {
    reply.view('views/auth/login');
};
AuthController.signupView = (request, reply) => {
    reply.view('views/auth/signup');
};
// Hará falta usar el type [ LoginRQ ] para el post del login
// static login = (request: LoginRQ, reply: FastifyReply) => {
AuthController.login = (request, reply) => {
    console.log('SUCCESS!');
    reply.redirect('/');
};
AuthController.logout = (request, reply) => {
    request.logOut();
    reply.redirect('/');
};
AuthController.signup = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = request.body;
    try {
        const newUser = yield (0, user_domain_1.createUserLocal)(username, email, password);
        console.log(`Created user ${newUser.username} with objectid ${newUser._id}`);
        // Auto login the user in session
        yield request.logIn(newUser);
        reply.redirect('/');
    }
    catch (error) {
        console.log('Error signup:', error);
        reply.view('views/auth/signup', { error: 'MEEECK! Something went wrong...' });
    }
});
exports.default = AuthController;
