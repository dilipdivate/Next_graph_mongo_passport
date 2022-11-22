/** @type {import('next').NextConfig} */

import path from 'path';
// const path = require('path');
const __dirname = path.resolve();

const dev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  reactStrictMode: true,
  env: {
    BASE_URL: dev
      ? 'http://localhost:3000/graphql'
      : 'https://dilip-next-graphql-mongodb.herokuapp.com/graphql',
  },
};
export default nextConfig;
