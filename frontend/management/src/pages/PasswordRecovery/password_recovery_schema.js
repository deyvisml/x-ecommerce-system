import * as yup from "yup";

export const password_recovery_schema = yup.object({
  password: yup.string().max(30).required("El campo es requerido."),
  password_confirmation: yup
    .string()
    .max(30)
    .required("El campo es requerido."),
});
