import yup from "yup";

export const categoryValidator = yup.object({
  name: yup.string().required(),
});
