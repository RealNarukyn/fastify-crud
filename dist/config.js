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
    // eslint-disable-next-line no-use-before-define
    if (process.env.environment === 'dev')
        return `mongodb://localhost:27017/${MONGO_DATABASE}`;
    if (process.env.MONGO_HOST)
        return process.env.MONGO_HOST;
    throw new Error('NOT GETTING A PROPER MONGO HOST value...');
};
// #region [ APP Config ]
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
// #endregion
// #region [ MONGODB Config ]
const MONGO_DATABASE = validators_1.Validators.checkEnv('MONGO_DATABASE');
const MONGO_USER = validators_1.Validators.checkEnv('MONGO_USER');
const MONGO_PASSWORD = validators_1.Validators.checkEnv('MONGO_PASSWORD');
const MONGO_HOST = getDBHost();
const MONGO = {
    host: MONGO_HOST,
    database: MONGO_DATABASE,
    user: MONGO_USER,
    password: MONGO_PASSWORD
};
// #endregion
// #region [ GIT HUB Passport CONFIG ]
const GITHUB = {
    CLIENT_ID: validators_1.Validators.checkEnv('GITHUB_CLIENT_ID'),
    CLIENT_SECRET: validators_1.Validators.checkEnv('GITHUB_CLIENT_SECRET'),
    CALLBACK: 'http://localhost:3000/auth/github/callback'
};
// #endregion
const config = {
    APP,
    MONGO,
    GITHUB
};
exports.default = config;
