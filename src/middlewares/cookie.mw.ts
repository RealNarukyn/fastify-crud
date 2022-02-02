import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import _ from 'lodash';

export const sessionEnviroment: FastifyPluginAsync = fp(async (app) => {
  // eslint-disable-next-line no-unused-vars
  app.addHook('onRequest', async (request:FastifyRequest, reply:FastifyReply) => {
    const { session } = request;

    // eslint-disable-next-line no-unused-expressions
    session.counter ? session.counter++ : (session.counter = 1);

    // get current env
    const currentEnv = {
      browser: request.browser,
      os: request.os
    };

    if (session.env) {
      const sameEnviroment = _.isEqual(currentEnv, session.env);
      if (!sameEnviroment) {
        throw new Error('SECURITY ISSUE, not same envirioment');
      }
    }
    // store the actual enviroment in session
    session.env = currentEnv;
  });
});
