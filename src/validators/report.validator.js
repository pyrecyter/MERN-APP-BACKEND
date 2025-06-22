import yup from "yup";

export const reportValidator = yup.object({
  from: yup.date().required(),
  to: yup.date().required(),
});
