const postService = require('../services/postService');
const postCategoryService = require('../services/postCategoryService');
var httpContext = require('express-http-context');

const postController = {
  create: async (request, response) => {
    const newPost = request.body;
    var { userId } = httpContext.get('authenticateUser')
    const postCreated = await postService.create(newPost, userId);
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
    var { userId } = httpContext.get('authenticateUser')
    const post = await postService.update(Number(id), dataToUpdate, userId);

    response.status(200).json(post);
  },

  delete: async (request, response) => {
    const { id } = request.params;
    var { userId } = httpContext.get('authenticateUser')
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