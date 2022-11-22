// const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import mongoose from 'mongoose';

const forumCategorySchema = new Schema({
  title: String,
  subTitle: String,
  slug: { type: String, unique: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ForumCategory', forumCategorySchema);
