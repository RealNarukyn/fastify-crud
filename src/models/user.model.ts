import { model, Schema } from 'mongoose';

import { IUser } from '../types/user.type';

const schema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  provider: { type: String, required: true },
  socialid: { type: String }
}, {
  timestamps: true
});

export const UserModel = model<IUser>('user', schema);
