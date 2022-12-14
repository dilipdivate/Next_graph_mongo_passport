// import { ApolloServer } from 'apollo-server';
import { ApolloServer } from 'apollo-server-express';
import { expressMiddleware } from '@apollo/server/express4';
import { v4 as uuidv4 } from 'uuid';
import graphql from 'graphql';
import resolvers from './schemas/resolvers.js';
import typeDefs from './schemas/typeDefs.js';
import next from 'next';
// import session from 'express-session';
import { buildAuthContext } from './context/index.js';
import passport from 'passport';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import cors from 'cors';
import { createApolloServer } from './graphQL/index.js';
import PortfolioSrv from './services/portfolio.js';
import UserSrv from './services/User.js';
import ForumCategorySrv from './services/forumCategory.js';
import TopicSrv from './services/topic.js';
import PostSrv from './services/post.js';

import PortfolioModel from './models/portfolio.js';
import UserModel from './models/User.js';
import ForumCategoryModel from './models/forumCategory.js';
import TopicModel from './models/topic.js';
import PostModel from './models/post.js';
import express from 'express';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import session from 'express-session';
// const MongoDBStore = require('connect-mongodb-session')(session);

import { default as connectMongoDBSession } from 'connect-mongodb-session';

const MongoDBStore = connectMongoDBSession(session);

import dotenv from 'dotenv';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import GraphqlStrategy from './middlewares/passport/strategies.js';
// const port = parseInt(process.env.PORT, 10) || 5000;
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
import { init } from './middlewares/index.js';
// import cookie-parser from 'cookie-parser';

//connect to database
connectDB();
const dev = process.env.NODE_ENV !== 'production';
const app1 = next({ dev });
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });

const app = express();
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(express.cookieParser());
// app.use(require('cookie-parser'));
// app.use(express.bodyParser());
// var store = new MongoDBStore({
//   uri: MONGODB_URI,
//   databaseName: 'GraphDB',
//   collection: 'portfolioSessions',
// });

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://studio.apollographql.com',
    'https://dilip-next-graphql-mongodb.herokuapp.com',
  ],
  credentials: true,
};
app.use(cors(corsOptions));
// app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   console.log('Deserialize:', id);
//   User.findById(id, (error, user) => {
//     done(error, user);
//   });
// });

// passport.serializeUser((user, done) => {
//   // console.log('Dilipse:', user);
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   console.log('Dilipde:', id);
//   UserModel.findById(id, (error, user) => {
//     done(error, user);
//   });
//   // const users = User.getUsers();
//   // const matchingUser = users.find((user) => user.id === id);
//   // done(null, matchingUser);
// });

// passport.use(
//   'graphql',
//   new GraphqlStrategy(({ email, password }, done) => {
//     UserModel.findOne({ email }, (error, user) => {
//       if (error) {
//         return done(error);
//       }
//       if (!user) {
//         return done(null, false);
//       }

//       // TODO: Check user password if its maching password from options
//       // return done(null, user);
//       user.validatePassword(password, (error, isMatching) => {
//         if (error) {
//           return done(error);
//         }
//         if (!isMatching) {
//           return done(null, false);
//         }

//         return done(null, user);
//       });
//     });

// const users = User.getUsers();
// const matchingUser = users.find(
//   (user) => email === user.email && password === user.password
// );
// const error = matchingUser ? null : new Error('no matching user');
// done(error, matchingUser);
//   })
// );

// app.use(
//   session({
//     name: 'portfolio-session',
//     genid: (req) => uuidv4(),
//     secret: SESSION_SECRECT,
//     cookie: { maxAge: 2 * 60 * 60 * 1000 },
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

init(app);

createApolloServer(app);

// app.use(expressMiddleware(apolloServer));

// await apolloServer.start();

// server.applyMiddleware({ app: app, cors: false });
// app.use('/graphql', (req, res, next) => {
//   console.log(res);
//   next();
// });

app.listen(port, function (err) {
  if (err) {
    throw err;
  }

  console.log(`server is listening on ${port}...`);
});

// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers,
//   csrfPrevention: true,
//   cache: 'bounded',
//   plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
//   context: ({ req }) => ({
//     ...buildAuthContext(req),

//     models: {
//       Portfolio: new PortfolioSrv(PortfolioModel, req.user),
//       User: new UserSrv(UserModel),
//       ForumCategory: new ForumCategorySrv(ForumCategoryModel),
//       Topic: new TopicSrv(TopicModel, req.user),
//       Post: new PostSrv(PostModel, req.user),
//     },
//   }),
//   cors: {
//     origin: [
//       // 'https://www.your-app.example',
//       'http://localhost:3001',
//       'http://localhost:3000',
//       'https://studio.apollographql.com',
//       'https://dilip-next-graphql-mongodb.herokuapp.com',
//     ],
//     credentials: true,
//   },
// });

// const PORT = process.env.PORT || 5000;

// apolloServer
//   .listen(PORT)
//   .then(({ url }) => {
//     console.log(`Server is ready at ${url}`);
//   })
//   .catch((err) => console.error(err));
