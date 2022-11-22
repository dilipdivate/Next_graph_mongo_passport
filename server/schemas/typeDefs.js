import { gql } from 'apollo-server';
// import ISODate from '../scalars/ISODate';
// var ObjectId = require('mongoose').Types.ObjectId;

const portfolioFields = `
  title: String,
  company: String,
  companyWebsite: String,
  location: String,
  jobTitle: String,
  description: String,
  startDate: String,
  endDate: String
`;

const typeDefs = gql`

type Portfolio {
    _id: ID,
    ${portfolioFields}
  }

  input PortfolioInput {
    ${portfolioFields}
  }

  type User {
    _id: ID,
    avatar: String
    username: String
    name: String
    email: String
    role: String
  }

  input SignUpInput {
    avatar: String
    username: String!
    name: String
    email: String!
    password: String!
    passwordConfirmation: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type ForumCategory {
    _id: ID
    title: String
    subTitle: String
    slug: String
  }

  type Author {
    avatar: String
    username: String
  }

  type Topic {
    _id: ID
    slug: String
    title: String
    content: String
    forumCategory: ForumCategory
    user: Author
    createdAt: String
  }

  input TopicInput {
    title: String
    content: String
    forumCategory: String
  }

  type Post {
    _id: ID
    content: String
    slug: String
    fullSlug: String
    topic: Topic
    user: User
    parent: Post
    createdAt: String
  }

  type PagPosts {
    posts: [Post]
    count: Int
  }

  input PostInput {
    content: String
    parent: String
    topic: String
  }

  type HighlightRes {
    portfolios: [Portfolio]
    topics: [Topic]
  }
  
  type Query {
    portfolio(id: ID): Portfolio
    portfolios: [Portfolio]
    userPortfolios: [Portfolio]

    user: User
    forumCategories: [ForumCategory]

    topicsByCategory(category: String): [Topic]
    topicBySlug(slug: String): Topic
    postsByTopic(slug: String, pageNum: Int, pageSize: Int): PagPosts

    highlight(limit: Int): HighlightRes
  }

  type Mutation {
    createPortfolio(input: PortfolioInput): Portfolio
    updatePortfolio(id: ID, input: PortfolioInput): Portfolio
    deletePortfolio(id: ID): ID

    createTopic(input: TopicInput): Topic

    createPost(input: PostInput): Post

    signUp(input: SignUpInput): String
    signIn(input: SignInInput): User
    signOut: Boolean
  }
`;

export default typeDefs;
