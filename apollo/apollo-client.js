import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

const httpLink = createHttpLink({
  // uri: 'http://localhost:4000/',
  uri: [
    // 'http://localhost:5000/',
    'http://localhost:5000/graphql/',
    // 'https://studio.apollographql.com/',
  ],
  // uri: 'https://twobrother0927.firebaseio.com/.json',
  // uri: 'https://dilip-graphql-backend.herokuapp.com/',
  headers: {
    // Authorization: 'Bearer ddivate',
    // rapidkey: 'c190581bcbmshfb7b40ab413ea41p1cf2efjsna9a8ac690487',
    // rapidhost: 'exercisedb.p.rapidapi.com',
    // cookie: req.header('Cookie'),
  },
});

const client = new ApolloClient({
  link: httpLink,
  ssrMode: true,
  cache,
});

export default client;
