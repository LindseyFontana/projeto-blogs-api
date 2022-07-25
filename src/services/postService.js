const Joi = require('joi');
const ApplicationError = require('../error/error');
const { Category } = require('../database/models');
const { BlogPost } = require('../database/models');
const { User: UserModel } = require('../database/models');
const err = require('../constants/errorMessage');

const formatPost = ({ id, title, content, userId, published, updated, User, Categories }) => ({
  id, 
  title,
  content, 
  userId, 
  published, 
  updated, 
  user: User.dataValues, 
  categories: Categories,
});

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

  create: async (userId, { title, content }) => {
    await BlogPost.create({ 
      title, content, userId, published: new Date(), updated: new Date(),
    });
    const post = await BlogPost.findOne({ where: { title, userId } });
    return post.dataValues;
  },

  getAll: async () => {
    const posts = await BlogPost.findAll({ 
      include: [
        { model: UserModel, attributes: { exclude: ['password'] } },
        { model: Category, through: { attributes: [] } },
      ],
    });
    const newPosts = posts.map(({ dataValues }) => dataValues)
      .map((post) => formatPost(post));
    return newPosts;
  },

  getById: async (postId) => {
    const post = await BlogPost.findByPk(postId, { include: [
        { model: UserModel, attributes: { exclude: ['password'] } },
        { model: Category, through: { attributes: [] } },
      ] });
    
    if (!post) throw new ApplicationError(err.postNotFound, 404);

    return formatPost(post);
  },
};

module.exports = postService;
