"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const dotenv_1 = __importDefault(require("dotenv"));
const validators_1 = require("./utils/validators");
dotenv_1.default.config();
const getDBHost = () => {
    if (process.env.environment === 'dev')
        return `mongodb://localhost:27017/${MONGO_DATABASE}`;
    return `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:27017/${MONGO_DATABASE}`;
};
// -- [ APP Config ]
const APP_PORT = process.env.PORT || 3000;
const APP_LOGGER = (0, pino_1.default)({
    name: process.env.APP_NAME || 'default-api-name',
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss',
            colorize: true
        }
    }
});
const APP = { port: APP_PORT, logger: APP_LOGGER };
// -- [ MONGODB Config ]
const MONGO_DATABASE = validators_1.Validators.checkEnvVar('mongo database', process.env.MONGO_DATABASE);
const MONGO_USER = validators_1.Validators.checkEnvVar('mongo user', process.env.MONGO_USER);
const MONGO_PASSWORD = validators_1.Validators.checkEnvVar('mongo pass', process.env.MONGO_PASSWORD);
const MONGO_HOST = getDBHost();
const MONGO = {
    host: MONGO_HOST,
    database: MONGO_DATABASE,
    user: MONGO_USER,
    password: MONGO_PASSWORD
};
const config = {
    APP,
    MONGO
};
exports.default = config;
