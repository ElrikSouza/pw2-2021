import { Forbidden } from "../errors/errors.js";
import { ImagesService } from "../image-upload/images-service.js";
import { PermissionsService } from "../permissions/permissions-service.js";
import { Products } from "./product.model.js";
import { v4 } from "uuid";

const createProduct = async (product, user_id) => {
  const isUserAdm = await PermissionsService.isUserAdm(user_id);

  if (!isUserAdm) {
    throw new Forbidden(
      "This user does not have permission to create products."
    );
  }

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

export const ProductsService = {
  createProduct,
};
