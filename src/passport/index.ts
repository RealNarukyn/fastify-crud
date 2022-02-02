/* eslint-disable max-len */
/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify';
import fastifyPassport from 'fastify-passport';

import { UserModel } from '../models/user.model';
import { IUser } from '../types/user.type';

// Load the strategies
import { local_strategy } from './strategy/local.strategy';
import { github_strategy } from './strategy/github.strategy';

// DOC: https://github.com/fastify/fastify-passport#session-serialization

// register a serializer that stores the user object's id in the session ...
fastifyPassport.registerUserSerializer<IUser, any>(async (user) => {
  console.log('serializing...');
  return user.id;
});

// ... and then a deserializer that will fetch that user from the database when a request with an id in the session arrives
fastifyPassport.registerUserDeserializer<IUser, any>(async (user_id) => {
  console.log('deserializing...');
  const user = await UserModel.findById(user_id);
  if (!user) {
    throw new Error('User not found');
  }
  return user.toObject(); // Pass a lean user witout being a document
});

// DOC: https://github.com/fastify/fastify-passport#example

export const preparePassport = async (app: FastifyInstance) => {
  await app.register(fastifyPassport.initialize());
  await app.register(fastifyPassport.secureSession());

  // Load passport local-strategies
  await fastifyPassport.use(local_strategy);

  // Load passport github-strategies
  await fastifyPassport.use(github_strategy);

  // Inicializamos el plugin de passport
  console.log('passport ready');
};
