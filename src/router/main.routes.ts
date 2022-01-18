import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../types/fastify.type';

// -- My Controllers
import MainController from '../controller/main.controller';

const mainRouter: FastifyPluginAsync = async (app: FastifyApp) => {
  // -- [ GET Routers ]
  app.get('/', MainController.main);
};

export default mainRouter;
