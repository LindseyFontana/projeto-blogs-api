const { PostCategory } = require('../database/models');
const { BlogPost } = require('../database/models');

const postCategoryService = {
  create: async (post, { title, categoryIds }) => {
    const postCategories = await Promise.all(categoryIds
     .map(async (id) => ({ postId: post.id, categoryId: id })));
    await PostCategory.bulkCreate(postCategories);
    const newPost = await BlogPost.findOne({ where: { title } });
    return newPost.dataValues;
  },
};

module.exports = postCategoryService;