import api from './api';

export const PostService = {
  // Get all posts
  async getAll() {
    const response = await api.get('/posts?_limit=5');
    return response.data;
  },

  // Get a single post
  async getById(id) {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  }
};
