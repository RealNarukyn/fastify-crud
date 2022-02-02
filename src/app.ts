// -- External Imports
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fastifyStatic from 'fastify-static';
import pointOfView from 'point-of-view';
import handlebars from 'handlebars';
import path from 'path';
import formBodyPlugin from 'fastify-formbody';
import mongoose from 'mongoose';
import fastifyMongodb from 'fastify-mongodb';
import cookie, { FastifyCookieOptions } from 'fastify-cookie';
import MongoStore from 'connect-mongo';
import fastifySession from '@fastify/session';

// -- Passport Config
import { preparePassport } from './passport';

// -- Globals
import config from './config';

// -- My Types
import { FastifyApp } from './types/fastify.type';

// -- Router
import mainRouter from './router/main.routes';

declare module 'fastify' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: { name: string };
    counter: number;
    env: {
      browser: string,
      os: string,
    }
  }
}

const mainApp: FastifyPluginAsync = async (app: FastifyApp) => {
  // -- Connect to the Database
  mongoose
    .connect(config.MONGO.host)
    .then(() => console.log('Connected to Database'))
    .catch((err) => {
      throw new Error(err);
    });

  // -- Serve static files
  app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/static/',
  });

  // -- Serve .hbs views
  app.register(pointOfView, {
    engine: { handlebars },
    layout: './views/layouts/main.hbs',
    options: {
      partials: {
        navbar: './views/partials/navbar.hbs',
        footer: './views/partials/footer.hbs',
        entry: './views/partials/entry.hbs',
        category: './views/partials/category.hbs',
      },
    },
  });

  // -- Create connection to the database for sessions
  app.register(fastifyMongodb, {
    forceClose: true,
    url: config.MONGO.host,
    name: 'MONGO1',
  });

  // -- Prepare accepting cookies
  app.register(cookie, {
    secret: 'my-secret', // for cookies signature
    parseOptions: {}, // options for parsing cookies
  } as FastifyCookieOptions);

  // -- Set where to store the session in the database
  const store: unknown = MongoStore.create({ mongoUrl: config.MONGO.host });
  app.register(fastifySession, {
    cookieName: 'YOUR_SESSION_COOKIE_NAME',
    secret: 'the secret must have length 32 or greater',
    cookie: {
      secure: false,
    },
    store: store as fastifySession.SessionStore,
  });

  // -- ???????
  app.addHook('preHandler', (request: FastifyRequest, reply: FastifyReply, next) => {
    const { session } = request;
    request.sessionStore.set(session.sessionId, session, next);
  });

  // -- ???????
  app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    // eslint-disable-next-line no-param-reassign
    (reply as any).locals = { user: request.user };
  });

  await preparePassport(app);

  // -- Accept Form Bodies
  app.register(formBodyPlugin);

  // -- Import all ROUTING
  app.register(mainRouter);
};

export default mainApp;
