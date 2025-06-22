import yup from "yup";

export const productValidator = yup.object({
  name: yup.string().required(),
  category: yup.string().required(),
  stock: yup.number().min(0).required(),
  description: yup.string(),
  unitPrice: yup.number().min(0).required(),
  images: yup.array(yup.string()),
});

export const productQuantityValidator = yup.object({
  stock: yup.number().min(0).required(),
});
