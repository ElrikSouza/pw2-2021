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

const deleteProduct = wrapWithErrorHandling(async (req, res) => {
  const { user_id } = req;
  const { id: product_id } = req.params;

  await ProductsService.deleteProduct(product_id, user_id);

  return res.status(200).send({ message: "Product has been deleted" });
});

const getOneProduct = wrapWithErrorHandling(async (req, res) => {
  const { id: product_id } = req.params;

  const product = await ProductsService.getOneProduct(product_id);

  return res.status(200).send(product);
});

export const ProductsController = {
  createProduct,
  deleteProduct,
  getOneProduct,
};
