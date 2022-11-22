import { gql } from '@apollo/client';

// FORUM QUERIES START ---------------------------

export const FORUM_CATEGORIES = gql`
  query ForumCategories {
    forumCategories {
      slug
      title
      subTitle
    }
  }
`;

const topicResponse = `
  _id
  slug
  title
  content
  user {
    username
    avatar
  }
  forumCategory {
    _id
    title
    slug
  }
`;

export const TOPICS_BY_CATEGORY = gql`
  query TopicsByCategory($category: String) {
    topicsByCategory(category: $category) {
      ${topicResponse}
    }
  }
`;

export const TOPIC_BY_SLUG = gql`
  query TopicBySlug($slug: String) {
    topicBySlug(slug: $slug) {
      ${topicResponse}
    }
  }
`;

export const CREATE_TOPIC = gql`
  mutation CreateTopic(
    $title: String
    $content: String
    $forumCategory: String
  ) {
    createTopic(input:{
      title: $title,
      content: $content
      forumCategory: $forumCategory
    }){
      ${topicResponse}
    }
  }
`;

const postResponse = `
  _id
  content
  slug
  createdAt
  user {
    username
    avatar
  }
  parent {
    content
    user {
      username
      avatar
    }
  }
`;

export const POSTS_BY_TOPIC = gql`
    query PostsByTopic($slug: String, $pageNum: Int, $pageSize: Int) {
      postsByTopic(slug: $slug, pageNum: $pageNum, pageSize: $pageSize) {
        posts {
          ${postResponse}
        }
        count
      }
    }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $content: String
    $topic: String
    $parent: String
  ) {
    createPost(input: {
      content: $content
      topic: $topic
      parent: $parent
    }) {
      ${postResponse}
    }
  }
`;

export const GET_HIGHLIGHT = gql`
  query Highlight($limit: Int) {
    highlight(limit: $limit) {
      topics {
        _id
        title
        content
        slug
        user {
          username
          avatar
        }
        createdAt
      }
      portfolios {
        _id
        title
        description
        jobTitle
        startDate
        endDate
      }
    }
  }
`;

// FORUM QUERIES END ---------------------------
