import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import creds from '../../config/credentials.json';

const googleStrategy = () => passport.use(new GoogleStrategy({
  clientID: creds.google.clientID,
  clientSecret: creds.google.clientSecret,
  callbackURL: `http://localhost:${process.env.PORT || 8080}/auth/callback/google`,
}, (token, tokenSecret, profile, cb) => {
  cb(null, profile);
})
);

export default googleStrategy;