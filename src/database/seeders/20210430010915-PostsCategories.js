module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('PostCategories',
      [
        {
          postId: 1,
          categoryId: 3,
        },
        {
          postId: 2,
          categoryId: 2,
        },
        {
          postId: 3,
          categoryId: 4,
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('PostCategories', null, {});
  },
};
