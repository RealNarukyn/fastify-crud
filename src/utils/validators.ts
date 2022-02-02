import bcrypt from 'bcryptjs';

// eslint-disable-next-line import/extensions
import { AUTH_PROVIDER, IUser } from '../types/user.type';

// eslint-disable-next-line import/prefer-default-export
export class Validators {
  static checkEnv = (envVar:string) => {
    if (process.env[envVar]) return process.env[envVar] as string;

    throw new Error(`Please define the Enviroment variable ${envVar}`);
  };

  static checkPassword = (user: IUser, plainPassword: string):boolean => {
    if (user.provider === AUTH_PROVIDER.LOCAL && user.password) {
      return bcrypt.compareSync(plainPassword, user.password);
    }
    throw new Error('You can only check the password for local registered users');
  };
}
