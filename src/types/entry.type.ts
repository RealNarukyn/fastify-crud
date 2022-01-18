import { FastifyRequest } from 'fastify';
import { Document } from 'mongoose';

// -- Types
import { ICategory } from './category.type';

export interface IEntry extends Document {
  title: String;
  description: String;
  category: ICategory['_id'];
}

interface AddEntryRequest {
  title: string;
  description: string;
  category: ICategory['_id'];
}

export type AddRQ = FastifyRequest<{ Body: AddEntryRequest }>;

export type SearchRQ = FastifyRequest<{ Body: { category: ICategory['_id'] } }>;
