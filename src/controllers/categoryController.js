const categoryService = require('../services/categoryService');

const categoryController = {
  create: async (request, response) => {
    const category = await categoryService.create(request.body);
    response.status(201).json(category);
  },

  getAll: async (_request, response) => {
    const categories = await categoryService.getAll();
    response.status(200).json(categories);
  },
};

module.exports = categoryController;
