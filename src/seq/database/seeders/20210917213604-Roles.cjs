"use strict";

const { hashSync } = require("bcrypt");
const { v4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const admId = v4();

    await queryInterface.bulkInsert("Roles", [
      {
        role_id: v4(),
        role_name: "USER",
      },
      {
        role_id: admId,
        role_name: "ADM",
      },
    ]);

    await queryInterface.bulkInsert("Users", [
      {
        user_id: v4(),
        role_id: admId,
        first_name: "adm",
        last_name: "adm",
        email: process.env.ADM_LOGIN,
        password: hashSync(process.env.ADM_PASS, 4),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Roles", {
      role_name: ["USER", "ADM"],
    });
  },
};
