import * as yup from "yup";

export const password_recovery_schema = yup.object({
  password: yup
    .string()
    .min(6, "El campo debe tener por lo menos 6 caracteres")
    .max(30)
    .required("El campo es requerido."),
  password_confirmation: yup
    .string()
    .min(6, "El campo debe tener por lo menos 6 caracteres")
    .max(30)
    .required("El campo es requerido.")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden."),
});
