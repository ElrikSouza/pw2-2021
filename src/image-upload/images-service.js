import { writeFile, rm } from "fs/promises";

const uploadFolder = "public/uploads";

const getFileExtension = (mimeType) => {
  return mimeType.split("/")[1];
};

const saveImage = async (imageBuffer, mimeType, id) => {
  const extension = getFileExtension(mimeType);
  const filename = `${id}.${extension}`;
  const path = `${uploadFolder}/${filename}`;

  await writeFile(path, imageBuffer);

  return path;
};

const deleteImage = async (imagePath) => {
  await rm(imagePath);
};

const replaceImage = async (path, imageBuffer) => {
  await writeFile(path, imageBuffer);
};

export const ImagesService = {
  saveImage,
  deleteImage,
  replaceImage,
};
