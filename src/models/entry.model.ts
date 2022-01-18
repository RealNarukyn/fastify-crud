import { Schema, model } from 'mongoose';

import { IEntry } from '../types/entry.type';

const EntrySchema = new Schema<IEntry>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
  },
  {
    timestamps: true
  }
);

export const EntryModel = model<IEntry>('Entry', EntrySchema);
