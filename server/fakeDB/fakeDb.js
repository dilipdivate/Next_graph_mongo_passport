import data from './data.js';
const { portfolios, users, topics, posts, forumCategories } = data;

import Portfolio from '../models/portfolio.js';
import User from '../models/User.js';
import ForumCategory from '../models/forumCategory.js';
import Topic from '../models/topic.js';
import Post from '../models/post.js';
// console.log(data);
class FakeDb {
  async clean() {
    await User.deleteMany({});
    await Portfolio.deleteMany({});
    await ForumCategory.deleteMany({});
    await Topic.deleteMany({});
    await Post.deleteMany({});
  }

  async addData() {
    // console.log(users);
    await User.create(users);
    await Portfolio.create(portfolios);
    await ForumCategory.create(forumCategories);
    await Topic.create(topics);
    await Post.create(posts);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

// module.exports = new FakeDb();

export default new FakeDb();
