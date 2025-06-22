import yup from "yup";
import { roles } from "../config/permissions.js";

export const userCreationValidator = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords do not match"),
  role: yup.string().required().oneOf(Object.values(roles), "Invalid role"),
});

export const userUpdateValidator = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.string().required().oneOf(Object.values(roles), "Invalid role"),
});
