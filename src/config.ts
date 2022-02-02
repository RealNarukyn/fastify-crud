import pino from 'pino';
import dotenv from 'dotenv';
import { FastifyLoggerInstance } from 'fastify';

import { Validators } from './utils/validators';

dotenv.config();

const getDBHost = (): string => {
  // eslint-disable-next-line no-use-before-define
  if (process.env.environment === 'dev') return `mongodb://localhost:27017/${MONGO_DATABASE}`;

  if (process.env.MONGO_HOST) return process.env.MONGO_HOST;

  throw new Error('NOT GETTING A PROPER MONGO HOST value...');
};

// #region [ APP Config ]
const APP_PORT = process.env.PORT || 3000;
const APP_LOGGER: FastifyLoggerInstance = pino({
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
const MONGO_DATABASE = Validators.checkEnv('MONGO_DATABASE');
const MONGO_USER = Validators.checkEnv('MONGO_USER');
const MONGO_PASSWORD = Validators.checkEnv('MONGO_PASSWORD');
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
  CLIENT_ID: Validators.checkEnv('GITHUB_CLIENT_ID'),
  CLIENT_SECRET: Validators.checkEnv('GITHUB_CLIENT_SECRET'),
  CALLBACK: 'http://localhost:3000/auth/github/callback'
};

// #endregion

const config = {
  APP,
  MONGO,
  GITHUB
};

export default config;
