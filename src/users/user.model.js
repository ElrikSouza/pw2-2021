"use strict";
import Sequelize from "sequelize";
import { db } from "../db.js";

const { DataTypes } = Sequelize;

const getUserInstance = (sequelize) => {
  return sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
