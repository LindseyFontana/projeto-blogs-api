const categoryService = require('../services/categoryService');

const categoryController = {
  create: async (request, response) => {
    const newCategory = request.body;
    await categoryService.validate(newCategory);
    const category = await categoryService.create(newCategory);
    response.status(201).json(category);
  },

  getAll: async (_request, response) => {
    const categories = await categoryService.getAll();
    response.status(200).json(categories);
  },
};

module.exports = categoryController;
