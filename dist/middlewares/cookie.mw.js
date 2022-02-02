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
exports.sessionEnviroment = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const lodash_1 = __importDefault(require("lodash"));
exports.sessionEnviroment = (0, fastify_plugin_1.default)((app) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-unused-vars
    app.addHook('onRequest', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { session } = request;
        // eslint-disable-next-line no-unused-expressions
        session.counter ? session.counter++ : (session.counter = 1);
        // get current env
        const currentEnv = {
            browser: request.browser,
            os: request.os
        };
        if (session.env) {
            const sameEnviroment = lodash_1.default.isEqual(currentEnv, session.env);
            if (!sameEnviroment) {
                throw new Error('SECURITY ISSUE, not same envirioment');
            }
        }
        // store the actual enviroment in session
        session.env = currentEnv;
    }));
}));
