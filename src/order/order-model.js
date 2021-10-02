import Sequelize from "sequelize";
import { db } from "../db.js";

const { DataTypes } = Sequelize;

const getOrdersInstance = (sequelize) => {
  if (!(sequelize instanceof Sequelize.Sequelize)) {
    throw Error("Expected a sequelize instance");
  }

  return sequelize.define(
    "Order",
    {
      order_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      sequelize: db,
      modelName: "Role",
      timestamps: true,
    }
  );
};

export const Orders = getOrdersInstance(db);
