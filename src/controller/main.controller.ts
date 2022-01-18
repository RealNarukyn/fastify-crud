import { FastifyRequest, FastifyReply } from 'fastify';

class MainController {
  static main = (req: FastifyRequest, reply: FastifyReply) => {
    reply.view('views/index');
  };
}

export default MainController;
