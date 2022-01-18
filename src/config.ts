import pino from 'pino';
import dotenv from 'dotenv';
import { FastifyLoggerInstance } from 'fastify';

import { Validators } from './utils/validators';

dotenv.config();

const getDBHost = (): string => {
  if (process.env.environment === 'dev')
    return `mongodb://localhost:27017/${MONGO_DATABASE}`;

  return `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:27017/${MONGO_DATABASE}`;
};

// -- [ APP Config ]
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

// -- [ MONGODB Config ]
const MONGO_DATABASE = Validators.checkEnvVar(
  'mongo database',
  process.env.MONGO_DATABASE
);
const MONGO_USER = Validators.checkEnvVar('mongo user', process.env.MONGO_USER);
const MONGO_PASSWORD = Validators.checkEnvVar(
  'mongo pass',
  process.env.MONGO_PASSWORD
);
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

export default config;
