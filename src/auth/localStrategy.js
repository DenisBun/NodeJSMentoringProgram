import passport from 'passport';
import { Strategy } from 'passport-local';


import data from '../../data/mockedRoutesData';

const passportLocal = () => {
  passport.use(new Strategy({
    usernameField: 'login',
    passwordField: 'password',
    session: false
  }, (username, password, done) => {

    const user = data.users.filter(user => user.email === username && user.password === password)[0];

    user !== undefined
      ? done(null, user)
      : done(null, false, { message: 'User not found or password incorrect'});
  }));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default passportLocal;