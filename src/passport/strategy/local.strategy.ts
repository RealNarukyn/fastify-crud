/* eslint-disable max-len */
import { Strategy as LocalStrategy } from 'passport-local';

import { Validators } from '../../utils/validators';

import { UserModel } from '../../models/user.model';

// eslint-disable-next-line camelcase
export const local_strategy = new LocalStrategy(async (username: string, password: string, done: any) => {
  const foundUser = await UserModel.findOne({ username });

  // DOC: http://www.passportjs.org/docs/configure/
  if (foundUser) {
    if (Validators.checkPassword(foundUser, password)) {
      console.log('LOGIN OK');
      return done(null, foundUser);
    }
    return done(null, false, {
      message: 'Incorrect password'
    });
  }
  console.log('User not found');
  return done(null, false, {
    message: 'User not found'
  });
});
