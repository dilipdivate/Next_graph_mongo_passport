import GraphqlStrategy from './strategies.js';
import User from '../../models/User.js';

export const passportInit = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((_id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });

  passport.use(
    'graphql',
    new GraphqlStrategy(({ email, password }, done) => {
      User.findOne({ email }, (error, user) => {
        if (error) {
          return done(error);
        }
        if (!user) {
          return done(null, false);
        }

        // TODO: Check user password if its maching password from options
        // return done(null, user);
        user.validatePassword(password, (error, isMatching) => {
          if (error) {
            return done(error);
          }
          if (!isMatching) {
            return done(null, false);
          }

          return done(null, user);
        });
      });
    })
  );
};
