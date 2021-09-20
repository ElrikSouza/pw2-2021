import { wrapWithErrorHandling } from "../errors/error-handling.js";
import { ProductsService } from "./products-service.js";

const createProduct = wrapWithErrorHandling(async (req, res) => {
  const { body, user_id } = req;

  const product = {
    ...body,
    product_image: {
      buffer: req.file.buffer,
      mimeType: req.file.mimetype,
    },
  };

  await ProductsService.createProduct(product, user_id);

  return res.status(201).send({ message: "Product has been created." });
});

export const ProductsController = {
  createProduct,
};
