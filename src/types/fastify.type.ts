import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

export type FastifyApp = FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
>;
