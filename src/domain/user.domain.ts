import { UserModel } from '../models/user.model';
import { AUTH_PROVIDER } from '../types/user.type';

import { Helper } from '../utils/helper';

export const createUserLocal = async (username: string, email: string, plainPassword: string) => {
  const password = Helper.hash(plainPassword);
  const userDoc = await UserModel.create({
    username, email, password, provider: AUTH_PROVIDER.LOCAL
  });
  return userDoc;
};

// eslint-disable-next-line max-len
export const createUserGitHub = async (username: string, email:string, githubID: string) => await UserModel.create({
  username, email, socialid: githubID, provider: AUTH_PROVIDER.GITHUB
});

// eslint-disable-next-line max-len
export const searchGitHubUser = async (githubID: string) => await UserModel.findOne({ socialid: githubID, provider: AUTH_PROVIDER.GITHUB });

export const deleteUser = async (username: string) => {
  const deleted = await UserModel.findOneAndDelete({ username });
  if (deleted) {
    console.log(`💀 User ${deleted.username} has been deleted`);
    return true;
  }
  console.log(`There's no user with username ${username} to be deleted`);
  return false;
};
