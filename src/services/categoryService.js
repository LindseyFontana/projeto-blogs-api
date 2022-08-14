const Joi = require('joi');
const ApplicationError = require('../error/error');
const { Category } = require('../database/models');
const err = require('../constants/errorMessage');

const categoryService = {
  validate: async (body) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
  const { error } = schema.validate(body);

  if (error) throw new ApplicationError(error.details[0].message, 400);
  },

  create: async ({ name }) => {
    await Category.create({ name });
    const category = await Category.findOne({ where: { name } });
    return category.dataValues;
  },

  getAll: async () => {
    const categories = await Category.findAll();
    return categories;
  },

  verifyIfExists: async (body) => {
    const category = await Category.findAll({
        where: { id: body.categoryIds },
      });

    if (category.length !== body.categoryIds.length) {
      throw new ApplicationError(err.CATEGORY_NOT_FOUND, 400);
    }
  },
};

module.exports = categoryService;
