import { Strategy as GitHubStrategy } from 'passport-github2';
import config from '../../config';
import { createUserGitHub, searchGitHubUser } from '../../domain/user.domain';

// eslint-disable-next-line camelcase
export const github_strategy = new GitHubStrategy(
  {
    clientID: config.GITHUB.CLIENT_ID,
    clientSecret: config.GITHUB.CLIENT_SECRET,
    callbackURL: config.GITHUB.CALLBACK
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ) => {
    console.log(profile);
    try {
      let user = await searchGitHubUser(profile.id);
      if (!user) {
        // FIRST TIME
        console.log('FIRST TIME GITHUB USER');
        const { username } = profile;
        const email = profile.emails[0].value;

        user = await createUserGitHub(username, email, profile.id);
      }
      done(null, user);
    } catch (error) {
      console.log('GITHUB STRATEGY LOGIN ERROR:', error);
      // This email is already registered
      done(null, false, {
        message: 'User already in the system, please login with a different option'
      });
    }
  }
);
