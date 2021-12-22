'use strict';

const { hashPassword } = require("../helpers/bc");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'john',
      password: hashPassword('john'),
      is_actived: true,
      is_deleted: false,
      createdAt : new Date(),
      updatedAt: new Date(),
      created_date: new Date(),
      created_by: 'System'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
