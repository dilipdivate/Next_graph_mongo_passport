const resolvers = {
  Query: {
    highlight: async (parent, { limit = 3 }, ctx) => {
      const portfolios = await ctx.models.Portfolio.getRandoms(limit);
      const topics = await ctx.models.Topic.getRandoms(limit);
      return {
        portfolios,
        topics,
      };
    },

    portfolio: (parent, { id }, ctx) => {
      return ctx.models.Portfolio.getById(id);
    },
    portfolios: (parent, args, ctx) => {
      return ctx.models.Portfolio.getAll();
    },
    userPortfolios: (parent, args, ctx) => {
      return ctx.models.Portfolio.getAllByUser();
    },

    user: (parent, args, ctx) => {
      return ctx.models.User.getAuthUser(ctx);
    },
    forumCategories: (parent, args, ctx) => {
      return ctx.models.ForumCategory.getAll();
    },
    topicsByCategory: async (parent, { category }, ctx) => {
      const forumCategory = await ctx.models.ForumCategory.getBySlug(category);
      if (!forumCategory) {
        return null;
      }

      return ctx.models.Topic.getAllByCategory(forumCategory._id);
    },
    topicBySlug: (parent, { slug }, ctx) => {
      return ctx.models.Topic.getBySlug(slug);
    },
    postsByTopic: async (parent, { slug, ...pagination }, ctx) => {
      const topic = await ctx.models.Topic.getBySlug(slug);
      return ctx.models.Post.getAllByTopic({ topic, ...pagination });
    },
  },
  Mutation: {
    createPortfolio: async (parent, { input }, ctx) => {
      const createdPortfolio = await ctx.models.Portfolio.create(input);
      return createdPortfolio;
    },
    updatePortfolio: async (parent, { id, input }, ctx) => {
      const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(
        id,
        input
      );
      return updatedPortfolio;
    },
    deletePortfolio: async (parent, { id }, ctx) => {
      const deletedPortfolio = await ctx.models.Portfolio.findAndDelete(id);
      return deletedPortfolio._id;
    },

    signUp: async (parent, { input }, ctx) => {
      const registeredUser = await ctx.models.User.signUp(input);
      return registeredUser._id;
    },
    signIn: (parent, { input }, ctx) => {
      return ctx.models.User.signIn(input, ctx);
    },
    signOut: (parent, args, ctx) => {
      return ctx.models.User.signOut(ctx);
    },
    createTopic: async (parent, { input }, ctx) => {
      const category = await ctx.models.ForumCategory.getBySlug(
        input.forumCategory
      );
      input.forumCategory = category._id;
      const topic = await ctx.models.Topic.create(input);
      return topic;
    },
    createPost: async (parent, { input }, ctx) => {
      const post = await ctx.models.Post.create(input);
      return post;
    },
  },
};

export default resolvers;
