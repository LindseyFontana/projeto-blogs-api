const postService = require('../services/postService');

const postController = {
  create: async (request, response) => {
    const token = request.headers.authorization;
    const newPost = request.body;
    await postService.validate(newPost);
    await postService.verifyIfExists(newPost);
    const userId = await postService.getUserIdByToken(token);
    const postCreated = await postService.createPost(userId, newPost);
    await postService.createPostCategories(postCreated, newPost);
    response.status(201).json(postCreated);
  },

  getAll: async (request, response) => {
    const posts = await postService.getAll();
    response.status(200).json(posts);
  },
};

module.exports = postController;