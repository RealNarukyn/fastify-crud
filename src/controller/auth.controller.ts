import { FastifyRequest, FastifyReply } from 'fastify';

class AuthController {
  static loginView = (req: FastifyRequest, reply: FastifyReply) => {
    reply.view('views/auth/login');
  };
  static signupView = (req: FastifyRequest, reply: FastifyReply) => {
    reply.view('views/auth/signup');
  };
  
  static login = (req: FastifyRequest, reply: FastifyReply) => {
    return console.log('under dev')
  };
  static signup = (req: FastifyRequest, reply: FastifyReply) => {
    return console.log('under dev')
  };
}

export default AuthController;
