const Joi = require("joi");
const path = require("path");

exports.postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255),
    body: Joi.string().min(4).max(10000),
    createdBy: Joi.string().min(2).max(255),
    id: Joi.string(),
  });
  return schema.validate(data).error;
};

exports.userValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255),
    email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(3).max(255),
  });
  return schema.validate(data).error;
};

exports.checkImgFromat = (image) => {
  let imageName = image.originalname;
  let imgExtension = path.extname(imageName);
  const allowedExtension = [".png", ".jpg", ".JPG", ".jpeg", ".svg", ".webp"];
  if (allowedExtension.includes(imgExtension) && imageName.length < 100)
    return true;
  return false;
};
