import BaseModel from './BaseModel.js';

class Portfolio extends BaseModel {
  constructor(model, user) {
    super(model, user);
    this.writeRights = ['instructor', 'admin'];
  }

  async getAll() {
    console.log('Portfilio:', this.Model);
    return await this.Model.find({});
  }

  async getAllByUser() {
    console.log('Portfilio:', this.Model);
    return await this.Model.find({ user: this.user._id }).sort({
      startDate: 'desc',
    });
  }

  async getById(id) {
    console.log('Portfilio:', this.Model);
    return await this.Model.findById(id);
  }

  async create(data) {
    console.log('DilipUser:', this.user, this.writeRights);
    if (!this.user || !this.writeRights.includes(this.user.role)) {
      throw new Error('Not Authorised!!!');
    }

    data.user = this.user;
    console.log('Portfilio:', this.Model);
    return await this.Model.create(data);
  }

  async findAndUpdate(id, data) {
    console.log('Portfilio:', this.Model);
    return await this.Model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
  }

  async findAndDelete(id) {
    console.log('Portfilio:', this.Model);
    return await this.Model.findOneAndRemove({ _id: id });
  }
}

export default Portfolio;
