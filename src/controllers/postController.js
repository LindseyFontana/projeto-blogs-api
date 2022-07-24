const postService = require('../services/postService');

const postController = {
  create: async (request, response) => {
    const token = request.headers.authorization;
    await postService.validate(request.body);
    await postService.verifyIfExists(request.body);
    const userId = await postService.getUserIdByToken(token);
    const post = await postService.createPost(userId, request.body);
    await postService.createPostCategories(post, request.body);
    response.status(201).json(post);
  },

  getAll: async (request, response) => {
    const posts = await postService.getAll();
    response.status(200).json(posts);
  },
};

module.exports = postController;