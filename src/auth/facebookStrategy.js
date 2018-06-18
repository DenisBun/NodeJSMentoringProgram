import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import creds from '../../config/credentials.json';

const facebookStrategy = () => passport.use(new FacebookStrategy({
  clientID: creds.facebook.clientID,
  clientSecret: creds.facebook.clientSecret,
  callbackURL: `http://localhost:${process.env.PORT || 8080}/auth/callback/facebook`,
}, (accessToken, refreshToken, profile, cb) => {
  cb(null, profile);
})
);

export default facebookStrategy;