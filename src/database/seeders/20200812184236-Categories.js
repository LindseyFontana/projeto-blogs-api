module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Categories',
      [
        {
          id: 1,
          name: 'Família',
        },
        {
          id: 2,
          name: 'Trabalho',
        },
        {
          id: 3,
          name: 'Escola',
        },
        {
          id: 4,
          name: 'Música',
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
