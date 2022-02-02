import { FastifyPluginAsync } from 'fastify';
import fastifyPassport from 'fastify-passport';

// -- My Types
import { FastifyApp } from '../types/fastify.type';

// -- My Controllers
import AuthController from '../controller/auth.controller';

const authRouter: FastifyPluginAsync = async (app: FastifyApp) => {
  // -- [ GET Routers ]
  app.get('/login', AuthController.loginView);
  app.get('/signup', AuthController.signupView);
  app.get('/logout', AuthController.logout);

  // -- [ GET GitHub Login]
  app.get('/github', fastifyPassport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  }));
  app.get(
    '/github/callback',
    fastifyPassport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

  // -- [ POST Routers ]
  app.post('/login', {
    preValidation: fastifyPassport.authenticate('local', {
      session: true
    })
  }, AuthController.login);
  app.post('/signup', AuthController.signup);
};

export default authRouter;
