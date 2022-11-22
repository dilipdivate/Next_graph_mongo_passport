import mongoose from 'mongoose';
import { ApolloServer, gql } from 'apollo-server-express';
import resolvers from '../schemas/resolvers.js';
import typeDefs from '../schemas/typeDefs.js';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { expressMiddleware } from '@apollo/server/express4';
import { buildAuthContext } from './../context/index.js';
import { validateToken } from '../context/auth-service.js';

import PortfolioSrv from '../services/portfolio.js';
import UserSrv from '../services/User.js';
import ForumCategorySrv from '../services/forumCategory.js';
import TopicSrv from '../services/topic.js';
import PostSrv from '../services/post.js';

import PortfolioModel from '../models/portfolio.js';
import UserModel from '../models/User.js';
import ForumCategoryModel from '../models/forumCategory.js';
import TopicModel from '../models/topic.js';
import PostModel from '../models/post.js';

export const createApolloServer = async (app) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    credentials: 'include',
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],

    playground: {
      settings: {
        // 'request.credentials': 'same-origin',
        // 'schema.polling.enable': false,
        // 'schema.polling.interval': 20000,
      },
    },
    context: ({ req }) => {
      if (req.headers && req.headers.authorization) {
        var auth = req.headers.authorization;
        var parts = auth.split(' ');
        var bearer = parts[0];
        var token = parts[1];

        if ((bearer = 'Bearer')) {
          const user = validateToken(token);
          if (user.error) {
            throw Error(user.msg);
          } else
            return {
              user,
              models: {
                Portfolio: new PortfolioSrv(PortfolioModel, req.user),
                User: new UserSrv(UserModel),
                ForumCategory: new ForumCategorySrv(ForumCategoryModel),
                Topic: new TopicSrv(TopicModel, req.user),
                Post: new PostSrv(PostModel, req.user),
              },
            };
        } else {
          throw Error('Authentication must use Bearer.');
        }
      } else {
        throw Error('User must be authenticated.');
      }
    },
    // context: ({ req }) => ({
    //   ...buildAuthContext(req),

    //   models: {
    //     Portfolio: new PortfolioSrv(PortfolioModel, req.user),
    //     User: new UserSrv(UserModel),
    //     ForumCategory: new ForumCategorySrv(ForumCategoryModel),
    //     Topic: new TopicSrv(TopicModel, req.user),
    //     Post: new PostSrv(PostModel, req.user),
    //   },
    // }),

    cors: {
      origin: [
        // 'https://www.your-app.example',
        'http://localhost:3000',
        'https://studio.apollographql.com',
        'https://dilip-next-graphql-mongodb.herokuapp.com',
      ],
      // credentials: true,
      credentials: 'include',
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });
  return apolloServer;
};
