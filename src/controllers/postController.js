const postService = require('../services/postService');
const userService = require('../services/userService');
const postCategoryService = require('../services/postCategoryService');

const postController = {
  create: async (request, response) => {
    const token = request.headers.authorization;
    const newPost = request.body;
    await postService.validate(newPost);
    await postService.verifyIfExists(newPost);
    const userId = await userService.getUserIdByToken(token);
    const postCreated = await postService.create(userId, newPost);
    await postCategoryService.create(postCreated, newPost);
    response.status(201).json(postCreated);
  },

  getAll: async (request, response) => {
    const posts = await postService.getAll();
    response.status(200).json(posts);
  },
};

module.exports = postController;