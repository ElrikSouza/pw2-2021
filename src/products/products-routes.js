import { Router } from "express";
import { upload } from "../image-upload/multer.js";
import { jwtMiddleware } from "../jwt/jwt-middleware.js";
import { ProductsController } from "./products-controller.js";

export const ProductsModule = Router();

ProductsModule.post(
  "/products",
  upload,
  jwtMiddleware,
  ProductsController.createProduct
);
