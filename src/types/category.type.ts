import { FastifyRequest } from 'fastify';
import { Document } from 'mongoose';

export interface ICategory extends Document {
  category: String;
  description: String;
}

export interface AddCategoryRequest {
  category: string;
  description: string;
}

export type AddRQ = FastifyRequest<{ Body: AddCategoryRequest }>;
