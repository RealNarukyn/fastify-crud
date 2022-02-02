/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { FastifyRequest, FastifyPluginAsync, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';

import { BROWSER, OS } from '../types/environment.type';

export const getBrowser = (request: FastifyRequest): BROWSER => {
  let browser: BROWSER = BROWSER.UNKNOWN;
  const userAgent = request.headers['user-agent'];
  if (userAgent) {
    if (userAgent.includes('Chrome')) {
      browser = BROWSER.CHROME;
    } else if (userAgent.includes('Safari')) {
      browser = BROWSER.SAFARI;
    } else if (userAgent.includes('Firefox')) {
      browser = BROWSER.FIREFOX;
    } else if (userAgent.includes('Postman')) {
      browser = BROWSER.POSTMAN;
    } else {
      browser = BROWSER.UNKNOWN;
    }
  }
  return browser;
};

export const getOS = (request: FastifyRequest): OS => {
  let os: OS = OS.UNKNOWN;
  const userAgent = request.headers['user-agent'];
  if (userAgent) {
    if (userAgent.includes('Mac')) {
      os = OS.MAC;
    } else if (userAgent.includes('Windows')) {
      os = OS.WINDOWS;
    } else if (userAgent.includes('Ubuntu')) {
      os = OS.UBUNTU;
    }
  }
  return os;
};

declare module 'fastify' {
    interface FastifyRequest {
        browser: BROWSER,
        os: OS
    }
}

export const middlewareEnviroment: FastifyPluginAsync = fp(async (app) => {
  app.addHook('onRequest', async (req: FastifyRequest, res: FastifyReply) => {
    req.browser = getBrowser(req);
    req.os = getOS(req);
  });
});
