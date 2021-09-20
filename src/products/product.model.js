import Sequelize from "sequelize";
import { db } from "../db.js";

const { DataTypes } = Sequelize;

const getProductsInstance = (sequelize) => {
  if (!(sequelize instanceof Sequelize.Sequelize)) {
    throw Error("Expected a sequelize instance");
  }

  return sequelize.define(
    "Product",
    {
      product_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      in_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize: db,
      modelName: "Product",
      timestamps: true,
    }
  );
};

export const Products = getProductsInstance(db);
