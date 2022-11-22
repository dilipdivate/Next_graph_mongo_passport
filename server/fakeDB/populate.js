// const mongoose = require('mongoose');
// import config from '../config/index.js';
// import connectDB from './config/db.js';
import mongoose from 'mongoose';
import fakeDb from './fakeDb.js';

import dotenv from 'dotenv';
dotenv.config();
// connectDB(async () => {
//   console.log('Starting populating DB...');
//   await fakeDb.populate();
//   await mongoose.connection.close();
//   console.log('DB has been populated...');
// });

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'GraphDB',
  },
  async () => {
    console.log('Starting populating DB...');
    await fakeDb.populate();
    await mongoose.connection.close();
    console.log('DB has been populated...');
  }
);

// mongoose.connect(
//   config.DB_URI,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   },
//   async () => {
//     console.log('Starting populating DB...');
//     await fakeDb.populate();
//     await mongoose.connection.close();
//     console.log('DB has been populated...');
//   }
// );
