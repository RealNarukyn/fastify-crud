import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../types/fastify.type';

// -- My Controllers
import EntryController from '../controller/entry.controller';

const entryRouter: FastifyPluginAsync = async (app: FastifyApp) => {
  // -- [ GET Routers ]
  app.get('/', EntryController.main);
  app.get('/rm', EntryController.remove);
  app.get('/rm-all', EntryController.removeAll);

  // -- [ POST Routers ]
  app.post('/', EntryController.search);
  app.post('/add', EntryController.add);
};

export default entryRouter;
