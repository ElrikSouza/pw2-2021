"use strict";
const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      user_id: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    {
      first_name: DataTypes.STRING(40),
      allowNull: false,
    },
    {
      last_name: DataTypes.STRING(40),
      allowNull: false,
    },
    {
      password: DataTypes.STRING(72),
      allowNull: false,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );

  return User;
};
