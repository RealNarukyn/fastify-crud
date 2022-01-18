import { FastifyRequest } from 'fastify';

export type RemoveRQ = FastifyRequest<{ Querystring: { _id: string } }>;
