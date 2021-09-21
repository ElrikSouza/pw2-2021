import { Forbidden, NotFound } from "../errors/errors.js";
import { ImagesService } from "../image-upload/images-service.js";
import { PermissionsService } from "../permissions/permissions-service.js";
import { Products } from "./product.model.js";
import { v4 } from "uuid";

const checkPermissions = async (user_id, message) => {
  const isUserAdm = await PermissionsService.isUserAdm(user_id);

  if (!isUserAdm) {
    throw new Forbidden(message);
  }
};

const createProduct = async (product, user_id) => {
  await checkPermissions(user_id, "This user cannot create products");

  const { product_image } = product;
  const product_id = v4();

  const imagePath = await ImagesService.saveImage(
    product_image.buffer,
    product_image.mimeType,
    product_id
  );

  await Products.create({
    product_name: product.product_name,
    product_image: imagePath,
    price: product.price,
    in_stock: product.in_stock,
    product_id,
  });
};

const deleteProduct = async (product_id, user_id) => {
  await checkPermissions(user_id, "This user cannot delete products");

  const product = await Products.findOne({
    where: { product_id },
    attributes: ["product_image", "product_id"],
  });

  if (product === null) {
    throw new NotFound("Product not found.");
  }

  const { product_image } = product;

  await ImagesService.deleteImage(product_image);
  await product.destroy();
};

const getOneProduct = async (product_id) => {
  const product = await Products.findOne({ where: { product_id } });

  if (product === null) {
    throw new NotFound("Product not found.");
  }

  return { product };
};

// Sem paginacao ainda
const getAllProducts = async () => {
  const products = await Products.findAll();

  return { products };
};

const editableFieldsProduct = ["product_name", "price", "in_stock"];

const mergeProduct = (original, changes) => {
  for (const field of editableFieldsProduct) {
    if (changes[field]) {
      original[field] = changes[field];
    }
  }
};

const editProduct = async (product_id, user_id, changes) => {
  await checkPermissions(user_id, "This user cannot edit products");

  const product = await Products.findOne({ where: { product_id } });

  if (product === null) {
    throw new NotFound("Product not found.");
  }

  if (changes.product_image) {
    await ImagesService.replaceImage(
      product.product_image,
      changes.product_image.buffer
    );
  }

  mergeProduct(product, changes);

  await product.save();
};

export const ProductsService = {
  createProduct,
  deleteProduct,
  getOneProduct,
  getAllProducts,
  editProduct,
};
