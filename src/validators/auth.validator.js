import yup from "yup";

export const userLoginValidator = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const userPasswordChangeValidator = yup.object({
  password: yup.string().min(6).required(),
  newPassword: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});
