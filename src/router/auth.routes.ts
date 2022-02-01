import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../types/fastify.type';

// -- My Controllers
import AuthController from '../controller/auth.controller';

const authRouter: FastifyPluginAsync = async (app: FastifyApp) => {
  // -- [ GET Routers ]
  app.get('/login', AuthController.loginView);
  app.get('/github', AuthController.loginView);
  app.get('/signup', AuthController.signupView);

  // -- [ POST Routers ]
  app.post('/login', AuthController.login);
  app.post('/signup', AuthController.signup);
};

export default authRouter;
