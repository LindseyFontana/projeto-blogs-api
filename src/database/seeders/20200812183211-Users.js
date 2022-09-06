module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        displayName: 'Marge Simpson',
        email: 'MAGUE@mail.com',
        password: '$2a$08$0OhjMpa2cn2osgoRnVyPCubuR6zK5KBkeIS9QPH5zJfB6jySEFWKC',
        image: 'https://upload.wikimedia.org/wikipedia/pt/0/0b/Marge_Simpson.png',
      },
      {
        id: 2,
        displayName: 'Homer Simpson',
        email: 'homer@mail.com',
        password: '$2a$08$0OhjMpa2cn2osgoRnVyPCubuR6zK5KBkeIS9QPH5zJfB6jySEFWKC',
        image: 'https://upload.wikimedia.org/wikipedia/pt/0/02/Homer_Simpson_2006.png',
      },
      {
        id: 3,
        displayName: 'Lisa Simpson',
        email: 'lisa@mail.com',
        password: '$2a$08$0OhjMpa2cn2osgoRnVyPCubuR6zK5KBkeIS9QPH5zJfB6jySEFWKC',
        image: 'https://upload.wikimedia.org/wikipedia/en/e/ec/Lisa_Simpson.png',
      },
      {
        id: 4,
        displayName: 'Bart Simpson',
        email: 'bart@mail.com',
        password: '$2a$08$0OhjMpa2cn2osgoRnVyPCubuR6zK5KBkeIS9QPH5zJfB6jySEFWKC',
        image: 'https://upload.wikimedia.org/wikipedia/pt/a/aa/Bart_Simpson_200px.png',
      },
      {
        id: 5,
        displayName: 'Milhouse Van Houten',
        email: 'milhouse@mail.com',
        password: '$2a$08$0OhjMpa2cn2osgoRnVyPCubuR6zK5KBkeIS9QPH5zJfB6jySEFWKC',
        image: 'https://upload.wikimedia.org/wikipedia/en/1/11/Milhouse_Van_Houten.png',
      },
      {
        id: 6,
        displayName: 'Nelson Muntz',
        email: 'nelson@mail.com',
        password: '$2a$08$0OhjMpa2cn2osgoRnVyPCubuR6zK5KBkeIS9QPH5zJfB6jySEFWKC',
        image: 'https://upload.wikimedia.org/wikipedia/en/c/c6/Nelson_Muntz.PNG',
      },
      {
        id: 7,
        displayName: 'Ned Flanders',
        email: 'ned@mail.com',
        password: '$2a$08$0OhjMpa2cn2osgoRnVyPCubuR6zK5KBkeIS9QPH5zJfB6jySEFWKC',
        image: 'https://upload.wikimedia.org/wikipedia/en/8/84/Ned_Flanders.png',
      },
      {
        id: 8,
        displayName: 'Apu Nahasapeemapetilon',
        email: 'apu@mail.com',
        password: '$2a$08$0OhjMpa2cn2osgoRnVyPCubuR6zK5KBkeIS9QPH5zJfB6jySEFWKC',
        image: 'https://upload.wikimedia.org/wikipedia/en/2/23/Apu_Nahasapeemapetilon_%28The_Simpsons%29.png',
      },
      {
        id: 9,
        displayName: 'Seymour Skinner',
        email: 'seymour@mail.com',
        password: '$2a$08$0OhjMpa2cn2osgoRnVyPCubuR6zK5KBkeIS9QPH5zJfB6jySEFWKC',
        image: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Seymour_Skinner.png',
      },
      {
        id: 10,
        displayName: 'Charles Montgomery Plantagenet Schicklgruber Burns',
        email: 'sr_burns.@mail.com',
        password: '$2a$08$0OhjMpa2cn2osgoRnVyPCubuR6zK5KBkeIS9QPH5zJfB6jySEFWKC',
        image: 'https://upload.wikimedia.org/wikipedia/en/5/56/Mr_Burns.png',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
