"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Roles", {
      role_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      role_name: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Roles");
  },
};
