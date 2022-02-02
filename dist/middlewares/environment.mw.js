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
exports.middlewareEnviroment = exports.getOS = exports.getBrowser = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const environment_type_1 = require("../types/environment.type");
const getBrowser = (request) => {
    let browser = environment_type_1.BROWSER.UNKNOWN;
    const userAgent = request.headers['user-agent'];
    if (userAgent) {
        if (userAgent.includes('Chrome')) {
            browser = environment_type_1.BROWSER.CHROME;
        }
        else if (userAgent.includes('Safari')) {
            browser = environment_type_1.BROWSER.SAFARI;
        }
        else if (userAgent.includes('Firefox')) {
            browser = environment_type_1.BROWSER.FIREFOX;
        }
        else if (userAgent.includes('Postman')) {
            browser = environment_type_1.BROWSER.POSTMAN;
        }
        else {
            browser = environment_type_1.BROWSER.UNKNOWN;
        }
    }
    return browser;
};
exports.getBrowser = getBrowser;
const getOS = (request) => {
    let os = environment_type_1.OS.UNKNOWN;
    const userAgent = request.headers['user-agent'];
    if (userAgent) {
        if (userAgent.includes('Mac')) {
            os = environment_type_1.OS.MAC;
        }
        else if (userAgent.includes('Windows')) {
            os = environment_type_1.OS.WINDOWS;
        }
        else if (userAgent.includes('Ubuntu')) {
            os = environment_type_1.OS.UBUNTU;
        }
    }
    return os;
};
exports.getOS = getOS;
exports.middlewareEnviroment = (0, fastify_plugin_1.default)((app) => __awaiter(void 0, void 0, void 0, function* () {
    app.addHook('onRequest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        req.browser = (0, exports.getBrowser)(req);
        req.os = (0, exports.getOS)(req);
    }));
}));
