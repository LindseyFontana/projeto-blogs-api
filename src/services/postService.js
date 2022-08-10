const Joi = require('joi');
const { Op } = require('sequelize');
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

const validateUserAuthorazation = async (postId, userId) => {
  const post = await BlogPost.findByPk(postId);
  if (!post) throw new ApplicationError(err.postNotFound, 404);
  if (post.userId !== userId) {
    throw new ApplicationError(err.userUnauthorized, 401);
  }
  return post;
};

const validateUpdate = async (postUserId, userId, dataToUpdate) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
   });

  const { error } = schema.validate(dataToUpdate);
  if (error) throw new ApplicationError(err.missingField, 400);
  
  return validateUserAuthorazation(postUserId, userId);
};

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

  // Colocar no postCategoryService
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

  update: async (postId, userId, dataToUpdate) => {
    const post = await validateUpdate(postId, userId, dataToUpdate);
    post.set({
      title: dataToUpdate.title,
      content: dataToUpdate.content,
      updated: new Date(),
    });
    await post.save();

    return postService.getById(postId);
  },

  delete: async (postId, userId) => {
    // const post = await postService.getById(postId);
    await validateUserAuthorazation(postId, userId);

    await BlogPost.destroy({
      where: {
        id: postId,
      },
      force: true,
    });
  },

  search: async (searchTerm) => {
    if (!searchTerm) return postService.getAll();
    const posts = await BlogPost.findAll({
      where: { 
        [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } }, 
        { content: { [Op.like]: `%${searchTerm}%` } }],
      },
      include: [
        { model: UserModel, attributes: { exclude: ['password'] } },
        { model: Category, through: { attributes: [] } },
      ] });
    const formatPosts = posts.map(({ dataValues }) => dataValues)
      .map((post) => formatPost(post));
    return formatPosts;
  },
};

module.exports = postService;
