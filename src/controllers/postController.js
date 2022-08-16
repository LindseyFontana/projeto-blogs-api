const postService = require('../services/postService');
const userService = require('../services/userService');
const postCategoryService = require('../services/postCategoryService');

const postController = {
  create: async (request, response) => {
    const token = request.headers.authorization;
    const newPost = request.body;
    const postCreated = await postService.create(token, newPost);
    await postCategoryService.create(postCreated, newPost);
  
    response.status(201).json(postCreated);
  },

  getAll: async (_request, response) => {
    const posts = await postService.getAll();
    response.status(200).json(posts);
  },

  getById: async (request, response) => {
    const { id } = request.params;
    const post = await postService.getById(id);
    response.status(200).json(post);
  },

  update: async (request, response) => {
    const { id } = request.params;
    const dataToUpdate = request.body;
    const token = request.headers.authorization;

    const userId = await userService.extractUserIdFromAccessToken(token);
    const post = await postService.update(Number(id), Number(userId), dataToUpdate);

    response.status(200).json(post);
  },

  delete: async (request, response) => {
    const { id } = request.params;
    const token = request.headers.authorization;

    const userId = await userService.extractUserIdFromAccessToken(token);
    await postService.delete(Number(id), Number(userId));
    response.status(204).send();
  },

  search: async (request, response) => {
    const { q } = request.query;
    const result = await postService.search(q);
    response.status(200).json(result);
  },
};

module.exports = postController;