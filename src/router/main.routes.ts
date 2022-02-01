import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../types/fastify.type';

// -- My Controllers
import MainController from '../controller/main.controller';

// -- Routers
import entryRouter from './entry.routes';
import categoryRouter from './category.routes';
import authRouter from './auth.routes';

const mainRouter: FastifyPluginAsync = async (app: FastifyApp) => {
  // -- [ GET Routers ]
  app.get('/', MainController.main);

  // -- [ Other Routers ]
  app.register(entryRouter, { prefix: '/entries' });
  app.register(categoryRouter, { prefix: '/categories' });
  app.register(authRouter, { prefix: '/auth' });

};

export default mainRouter;
