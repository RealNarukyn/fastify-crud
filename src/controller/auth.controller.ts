/* eslint-disable no-unused-vars */
import { FastifyRequest, FastifyReply } from 'fastify';
import { createUserLocal } from '../domain/user.domain';

import { LoginRQ, SingupRQ } from '../types/auth.type';

class AuthController {
  static loginView = (request: FastifyRequest, reply: FastifyReply) => {
    reply.view('views/auth/login');
  };

  static signupView = (request: FastifyRequest, reply: FastifyReply) => {
    reply.view('views/auth/signup');
  };

  // Hará falta usar el type [ LoginRQ ] para el post del login
  // static login = (request: LoginRQ, reply: FastifyReply) => {
  static login = (request: LoginRQ, reply: FastifyReply) => {
    console.log('SUCCESS!');
    reply.redirect('/');
  };

  static logout = (request:FastifyRequest, reply: FastifyReply) => {
    request.logOut();
    reply.redirect('/');
  };

  static signup = async (request: SingupRQ, reply: FastifyReply) => {
    const { username, email, password } = request.body;
    try {
      const newUser = await createUserLocal(username, email, password);
      console.log(`Created user ${newUser.username} with objectid ${newUser._id}`);

      // Auto login the user in session
      await request.logIn(newUser);

      reply.redirect('/');
    } catch (error) {
      console.log('Error signup:', error);
      reply.view('views/auth/signup', { error: 'MEEECK! Something went wrong...' });
    }
  };
}

export default AuthController;
