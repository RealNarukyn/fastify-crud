// -- External Imports
import { FastifyPluginAsync } from 'fastify';
import fastifyStatic from 'fastify-static';
import pointOfView from 'point-of-view';
import * as handlebars from 'handlebars';
import * as path from 'path';
import formBodyPlugin from 'fastify-formbody';
import mongoose from 'mongoose';

// -- Globals
import config from './config';

// -- My Types
import { FastifyApp } from './types/fastify.type';

// -- Routes
import mainRouter from './router/main.routes';
import entryRouter from './router/entry.routes';
import categoryRouter from './router/category.routes';

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
    prefix: '/static/'
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
        category: './views/partials/category.hbs'
      }
    }
  });

  // -- Accept Form Bodies
  app.register(formBodyPlugin);

  // -- Import all ROUTING
  app.register(mainRouter);
};

export default mainApp;
