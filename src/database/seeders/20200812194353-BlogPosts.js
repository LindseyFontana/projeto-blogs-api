module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('BlogPosts',
      [
        {
          id: 1,
          title: 'Escola Elementar de Springfield',
          content: 'Volta às aulas',
          userId: 9,
          published: new Date('1989-08-01T19:58:00.000Z'),
          updated: new Date('1989-08-01T19:58:51.000Z'),
        },
        {
          id: 2,
          title: 'Usina Nuclear de Springfield',
          content: 'Acidente de Trabalho',
          userId: 10,
          published: new Date('1989-08-01T19:58:00.000Z'),
          updated: new Date('1989-08-01T19:58:51.000Z'),
        },
        {
          id: 3,
          title: 'Prêmio Saxofone',
          content: 'Lisa Simpson ganha prêmio de melhor saxofonista de Springfield',
          userId: 3,
          published: new Date('1989-08-01T19:58:00.000Z'),
          updated: new Date('1989-08-01T19:58:51.000Z'),
        },
      ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('BlogPosts', null, {});
  },
};
