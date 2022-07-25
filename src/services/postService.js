const Joi = require('joi');
const jwt = require('jsonwebtoken');
const ApplicationError = require('../error/error');
const { Category } = require('../database/models');
const { BlogPost } = require('../database/models');
const { PostCategory } = require('../database/models');
const { User } = require('../database/models');
const err = require('../constants/errorMessage');

const postService = {
  validate: async (body) => {
     const schema = Joi.object({
     title: Joi.string().required(),
     content: Joi.string().required(),
     categoryIds: Joi.array().required(),
    });
    const { error } = schema.validate(body);

    if (error) throw new ApplicationError(err.missingField, 400);
  },

  verifyIfExists: async (body) => {
    const category = await Category.findAll({
        where: { id: body.categoryIds },
      });

    if (category.length !== body.categoryIds.length) {
      throw new ApplicationError(err.categoryNotFound, 400);
    }
  },
  
  createPostCategories: async (post, { title, categoryIds }) => {
    const postCategories = await Promise.all(categoryIds
        .map(async (id) => ({ postId: post.id, categoryId: id })));
    await PostCategory.bulkCreate(postCategories);
    const newPost = await BlogPost.findOne({ where: { title } });
    return newPost.dataValues;
  },

  createPost: async (userId, { title, content }) => {
    await BlogPost.create({ 
      title, content, userId, published: new Date(), updated: new Date(),
    });
    const post = await BlogPost.findOne({ where: { title, userId } });
    return post.dataValues;
  },

  getUserIdByToken: async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    return user.dataValues.id;
  },

  getAll: async () => {
    const posts = await BlogPost.findAll({ 
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Category, through: { attributes: [] } },
      ],
    });
    return posts;
  },
};

module.exports = postService;
