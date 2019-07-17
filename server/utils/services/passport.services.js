import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { socialCallback } from '../../controllers';

const {
  FACEBOOK_OAUTH_ID,
  FACEBOOK_OAUTH_SECRET,
  BACKEND_URL,
  GOOGLE_OAUTH_SECRET,
  GOOGLE_OAUTH_ID,
  TWITTER_OAUTH_ID,
  TWITTER_OAUTH_SECRET
} = process.env;


const facebookSetup = {
  clientID: FACEBOOK_OAUTH_ID,
  clientSecret: FACEBOOK_OAUTH_SECRET,
  callbackURL: `${BACKEND_URL}api/v1/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'emails'],
};

const googleSetup = {
  clientID: GOOGLE_OAUTH_ID,
  clientSecret: GOOGLE_OAUTH_SECRET,
  callbackURL: `${BACKEND_URL}api/v1/auth/google/callback`
};

const twitterSetup = {
  consumerKey: TWITTER_OAUTH_ID,
  consumerSecret: TWITTER_OAUTH_SECRET,
  callbackURL: `${BACKEND_URL}api/v1/auth/twitter/callback`,
  includeEmail: true,
};

const facebookStrategy = new FacebookStrategy(facebookSetup, socialCallback);
const googleStrategy = new GoogleStrategy(googleSetup, socialCallback);
const twitterStrategy = new TwitterStrategy(twitterSetup, socialCallback);

export { facebookStrategy, googleStrategy, twitterStrategy };
