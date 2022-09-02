const postService = require('../services/postService');
const userService = require('../services/userService');
const postCategoryService = require('../services/postCategoryService');

const postController = {
  create: async (request, response) => {
    const newPost = request.body;
    const postCreated = await postService.create(newPost);
    await postCategoryService.create(postCreated, newPost);
  
    response.status(201).json(postCreated);
  },

  getAll: async (_request, response) => {
    const posts = await postService.getAll();
    response.status(200).json(posts);
  },

  getById: async (request, response) => {
    const { id } = request.params;
    const post = await postService.getById(Number(id));
    response.status(200).json(post);
  },

  update: async (request, response) => {
    const { id } = request.params;
    const dataToUpdate = request.body;
    const post = await postService.update(Number(id), dataToUpdate);

    response.status(200).json(post);
  },

  delete: async (request, response) => {
    const { id } = request.params;
    const { userId } = request.body
    await postService.delete(Number(id), userId);
    response.status(204).send();
  },

  search: async (request, response) => {
    const { q } = request.query;
    const result = await postService.search(q);
    response.status(200).json(result);
  },
};

module.exports = postController;