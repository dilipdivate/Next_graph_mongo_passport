import BaseModel from './BaseModel.js';

class ForumCategory extends BaseModel {
  async getAll() {
    console.log('Forum:', this.Model);
    return await this.Model.find({});
  }

  async getBySlug(slug) {
    console.log('Forum:', this.Model);
    return await this.Model.findOne({ slug }).populate('user');
  }
}

// module.exports = ForumCategory;

export default ForumCategory;
