import session from 'express-session';
import passport from 'passport';
import { passportInit } from './passport/index.js';
import dotenv from 'dotenv';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import cookieSession from 'cookie-session';

dotenv.config();
const MongoDBStore = connectMongoDBSession(session);

const MONGODB_URI = process.env.MONGODB_URI;

export const init = (app) => {
  // require('./passport').init(passport);

  passportInit(passport);
  var store = new MongoDBStore({
    uri: MONGODB_URI,
    databaseName: 'GraphDB',
    collection: 'portfolioSessions',
  });

  const sess = {
    name: 'portfolio-session',
    secret: process.env.SESSION_SECRET,
    // cookie: { maxAge: 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      // maxAge: 360000,
      secure: false, // this should be true only when you don't want to show it for security reason
    },
    // store: db.initSessionStore(),
    store: store,
  };

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
    sess.cookie.httpOnly = true;
    sess.cookie.sameSite = true;
    sess.cookie.domain = process.env.DOMAIN; // .yourdomain.com
  }

  // app.use(
  //   cookieSession({
  //     name: 'session',
  //     maxAge: 60 * 60 * 1000,
  //     // keys: [key.cookieSession.key1],
  //     keys: 'test1',
  //   })
  // );

  // console.log(app.session);
  app.use(session(sess));
  app.use(passport.initialize());
  app.use(passport.session());
};
