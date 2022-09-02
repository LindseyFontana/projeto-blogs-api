const Joi = require('joi');
const ApplicationError = require('../error/error');
const { Category } = require('../database/models');
const err = require('../constants/errorMessage');

const validate = async (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { error } = schema.validate(body);

  if (error) throw new ApplicationError(error.details[0].message, 400);
};

const categoryService = {
  create: async (body) => {
    await validate(body);
    const newCategory = await Category.create(body);
    return {...newCategory.dataValues, id: newCategory.null};
  },

  getAll: async () => {
    return Category.findAll();
  },

  verifyIfExists: async (categoryIds) => {
    const category = await Category.findAll({
        where: { id: categoryIds },
      });

    if (category.length !== categoryIds.length) {
      throw new ApplicationError(err.CATEGORY_NOT_FOUND, 400);
    }
  },
};

module.exports = categoryService;
