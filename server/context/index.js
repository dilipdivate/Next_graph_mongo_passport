// const passport = require('passport');
import passport from 'passport';

// options == {email, password}
const authenticateUser = (req, options) => {
  // console.log('Server Context-req:', options);
  return new Promise((resolve, reject) => {
    const done = (error, user) => {
      // console.log('User1:', user);
      if (error) {
        return reject(new Error(error));
      }

      if (user) {
        req.login(user, (error) => {
          if (error) {
            return reject(new Error(error));
          }

          return resolve(user);
        });
      } else {
        return reject(new Error('Invalid password or email!'));
      }
    };

    const authFn = passport.authenticate('graphql', options, done)(req);
    authFn;
  });
};

export const buildAuthContext = (req) => {
  // console.log(
  //   'Dilip Build:',
  //   req.sessionStore.db
  //     .collection('portfolioSessions')
  //     .find(req.sesionStore.sessionId)
  // );
  const auth = {
    authenticate: (options) => authenticateUser(req, options),
    logout: () => {
      req.logout(function (req, res, err) {
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log('COming here1:', req);
      });
      req.session.destroy();
    },
    isAuthenticated: () => req.isAuthenticated(),
    getUser: () => req.user,
  };

  return auth;
};
