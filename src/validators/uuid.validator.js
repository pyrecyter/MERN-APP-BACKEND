import yup from "yup";

export const uuidValidator = yup.object({
  id: yup.string().matches(/^[a-f\d]{24}$/i, "ID format is invalid"),
});
