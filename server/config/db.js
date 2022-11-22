// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// const err = () => {
//   if (!err) {
//     console.log('MongoDB Connection Succeeded.');
//   } else {
//     console.log('Error in DB connection: ' + err);
//   }
// };

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
const connectDB = async () => {
  try {
    const connection = await mongoose
      .connect(
        MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'GraphDB' }
        // (err) => {
        //   if (!err) {
        //     console.log(`MongoDB Connection Succeeded`);
        //   } else {
        //     console.log('Error in DB connection: ' + err);
        //   }
        // }
      )
      .then((data) => {
        console.log(
          `MongoDB Connected: ${data.connection.host} ${data.connection.port}`
        );
      })
      .catch((error) => {
        console.log(error.code);
      });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
// module.exports = connectDB;
