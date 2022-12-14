class BaseModel {
  constructor(model, user = null) {
    this.Model = model;
    this.user = user;
  }

  async getRandoms(limit) {
    const count = await this.Model.countDocuments();
    let randomIndex;

    if (limit > count) {
      randomIndex = 0;
    } else {
      randomIndex = count - limit;
    }

    const random = Math.round(Math.random() * randomIndex);

    return async () => await this.Model.find({}).skip(random).limit(limit);
  }
}

export default BaseModel;
