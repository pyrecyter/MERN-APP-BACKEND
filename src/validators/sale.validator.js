import yup from "yup";

export const saleValidator = yup.object({
  customerName: yup.string().required(),
  address: yup.string(),
  items: yup
    .array(
      yup.object({
        productId: yup.string().required(),
        quantity: yup.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
});
