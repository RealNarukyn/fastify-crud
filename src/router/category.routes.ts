import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../types/fastify.type';

// -- My Controllers
import CategoryController from '../controller/category.controller';

const categoryRouter: FastifyPluginAsync = async (app: FastifyApp) => {
  // -- [ GET Routers ]
  app.get('/', CategoryController.main);
  app.get('/rm', CategoryController.remove);
  app.get('/rm-all', CategoryController.removeAll);

  // -- [ POST Routers ]
  app.post('/', CategoryController.add);
};

export default categoryRouter;
