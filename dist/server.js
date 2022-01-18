"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
const app = (0, fastify_1.default)({
    logger: config_1.default.APP.logger,
    pluginTimeout: 10000,
    disableRequestLogging: false
});
app.register(app_1.default);
app.listen(config_1.default.APP.port, '0.0.0.0', (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});
