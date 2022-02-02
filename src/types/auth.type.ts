import { FastifyRequest } from 'fastify';

interface ILoginRequest {
    username: string;
    password: string;
}

interface ISignupRequest {
    username: string;
    email: string;
    password: string;
}

export type SingupRQ = FastifyRequest<{ Body: ISignupRequest }>;

export type LoginRQ = FastifyRequest<{ Body: ILoginRequest }>;
