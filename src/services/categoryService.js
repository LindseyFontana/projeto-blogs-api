const Joi = require('joi');
const ApplicationError = require('../error/error');
const { Category } = require('../database/models');

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
};

module.exports = categoryService;
