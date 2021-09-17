"use strict";
import Sequelize from "sequelize";
import { db } from "../db.js";

const { DataTypes } = Sequelize;

const getUserInstance = (sequelize) => {
  return sequelize.define(
    "Role",
    {
      role_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      role_name: {
        // move to an enum later
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize: db,
      modelName: "Role",
      timestamps: false,
    }
  );
};

export const Roles = getUserInstance(db);
