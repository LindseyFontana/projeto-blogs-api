const Joi = require('joi');
const { Op } = require('sequelize');
const ApplicationError = require('../error/error');
const { Category, BlogPost } = require('../database/models');
const categoryService = require('./categoryService');
const userService = require('./userService');
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
  if (!post) throw new ApplicationError(err.POST_NOT_FOUND, 404);

  if (post.userId !== userId) {
    throw new ApplicationError(err.USER_UNAUTHORIZED, 401);
  }
  return post;
};

const validateUpdate = async (postUserId, dataToUpdate) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
   });

  const { error } = schema.validate(dataToUpdate);
  if (error) throw new ApplicationError(err.MISSING_FIELD, 400);
  
  return validateUserAuthorazation(postUserId, dataToUpdate.userId);
};

const validateRequestToCreatePost = (newPost) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
    userId: Joi.number().required(),
   });
   const { error } = schema.validate(newPost);
  
   if (error) throw new ApplicationError(err.MISSING_FIELD, 400);
};

const authenticate = async (newPost) => {
  validateRequestToCreatePost(newPost);
  await categoryService.verifyIfExists(newPost.categoryIds);
};

const searchPostByTerm = async (searchTerm) =>
  BlogPost.findAll({
    where: { 
      [Op.or]: [
      { title: { [Op.like]: `%${searchTerm}%` } }, 
      { content: { [Op.like]: `%${searchTerm}%` } }],
    },
    include: [
      { model: UserModel, attributes: { exclude: ['password'] } },
      { model: Category, through: { attributes: [] } },
    ] });

const updatePost = async (post, dataToUpdate) => {
  post.set({
    title: dataToUpdate.title,
    content: dataToUpdate.content,
    updated: new Date(),
  });
  await post.save();
};

const findAllPosts = async () => 
  BlogPost.findAll({ 
    include: [
      { model: UserModel, attributes: { exclude: ['password'] } },
      { model: Category, through: { attributes: [] } },
    ],
  });

const findPostById = async (postId) => 
  BlogPost.findByPk(postId, { include: [
    { model: UserModel, attributes: { exclude: ['password'] } },
    { model: Category, through: { attributes: [] } },
  ] });

const createPost = async ({ title, content, userId }) => 
  BlogPost.create({ 
    title, content, userId, published: new Date(), updated: new Date(),
  });

const findPostByInfos = async (newPost) => 
  BlogPost.findOne({ where: { 
    title: newPost.title, 
    userId: newPost.userId,
  } });

const postService = {
  create: async (newPost) => {
    await authenticate(newPost);
    await createPost(newPost);
    const postCreated = await findPostByInfos(newPost);
    return postCreated.dataValues;
  },

  getAll: async () => {
    const posts = await findAllPosts();
    return posts.map(({ dataValues }) => dataValues)
      .map((post) => formatPost(post));
  },

  getById: async (postId) => {
    const post = await findPostById(postId);    
    if (!post) throw new ApplicationError(err.POST_NOT_FOUND, 404);
  
    return formatPost(post);
  },

  update: async (postId, dataToUpdate) => {
    const post = await validateUpdate(postId, dataToUpdate);
    await updatePost(post, dataToUpdate);
  
    return postService.getById(postId);
  },

  delete: async (postId, userId) => {
    await validateUserAuthorazation(postId, userId);
    await BlogPost.destroy({
      where: {
        id: postId,
      },
    });
  },

  search: async (searchTerm) => {
    if (!searchTerm) return postService.getAll();
    
    const posts = await searchPostByTerm(searchTerm);
    return posts.map(({ dataValues }) => dataValues)
      .map((post) => formatPost(post));
  },

};

module.exports = postService;
