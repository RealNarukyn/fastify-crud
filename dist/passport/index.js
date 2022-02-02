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
exports.preparePassport = void 0;
const fastify_passport_1 = __importDefault(require("fastify-passport"));
const user_model_1 = require("../models/user.model");
// Load the strategies
const local_strategy_1 = require("./strategy/local.strategy");
const github_strategy_1 = require("./strategy/github.strategy");
// DOC: https://github.com/fastify/fastify-passport#session-serialization
// register a serializer that stores the user object's id in the session ...
fastify_passport_1.default.registerUserSerializer((user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('serializing...');
    return user.id;
}));
// ... and then a deserializer that will fetch that user from the database when a request with an id in the session arrives
fastify_passport_1.default.registerUserDeserializer((user_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('deserializing...');
    const user = yield user_model_1.UserModel.findById(user_id);
    if (!user) {
        throw new Error('User not found');
    }
    return user.toObject(); // Pass a lean user witout being a document
}));
// DOC: https://github.com/fastify/fastify-passport#example
const preparePassport = (app) => __awaiter(void 0, void 0, void 0, function* () {
    yield app.register(fastify_passport_1.default.initialize());
    yield app.register(fastify_passport_1.default.secureSession());
    // Load passport local-strategies
    yield fastify_passport_1.default.use(local_strategy_1.local_strategy);
    // Load passport github-strategies
    yield fastify_passport_1.default.use(github_strategy_1.github_strategy);
    // Inicializamos el plugin de passport
    console.log('passport ready');
});
exports.preparePassport = preparePassport;
