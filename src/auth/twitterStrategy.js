import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import creds from '../../config/credentials.json';

const twitterStrategy = () => passport.use(new TwitterStrategy({
  consumerKey: creds.twitter.consumerKey,
  consumerSecret: creds.twitter.consumerSecret,
  callbackURL: `http://localhost:${process.env.PORT || 8080}/auth/callback/twitter`,
}, (token, tokenSecret, profile, cb) => {
  cb(null, profile);
})
);

export default twitterStrategy;