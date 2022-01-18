import { Schema, model } from 'mongoose';

import { ICategory } from '../types/category.type';

const CategorySchema = new Schema<ICategory>(
  {
    category: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const CategoryModel = model<ICategory>('Category', CategorySchema);
