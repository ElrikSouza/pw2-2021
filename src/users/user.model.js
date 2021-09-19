"use strict";
import Sequelize from "sequelize";
import { db } from "../db.js";
import { Roles } from "../roles/role.model.js";

const { DataTypes } = Sequelize;

const getUserInstance = (sequelize) => {
  if (!(sequelize instanceof Sequelize.Sequelize)) {
    throw Error("Expected a sequelize instance");
  }

  return sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(72),
        allowNull: false,
      },
    },
    {
      sequelize: db,
      modelName: "User",
      timestamps: true,
    }
  );
};

export const UserModel = getUserInstance(db);

UserModel.hasOne(Roles, {
  foreignKey: "role_id",
  type: DataTypes.UUID,
  allowNull: false,
});
