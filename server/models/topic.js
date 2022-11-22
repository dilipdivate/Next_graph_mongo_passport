// const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import mongoose from 'mongoose';
const topicSchema = new Schema({
  title: String,
  content: String,
  slug: { type: String, unique: true, index: true },
  forumCategory: { type: Schema.Types.ObjectId, ref: 'ForumCategory' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

// module.exports = mongoose.model('Topic', topicSchema);

export default mongoose.model('Topic', topicSchema);
