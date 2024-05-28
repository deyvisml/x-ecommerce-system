import * as yup from "yup";

export const change_password_request_schema = yup.object({
  email: yup
    .string()
    .email("Ingrese un correo valido.")
    .max(150)
    .required("El campo es requerido."),
});
