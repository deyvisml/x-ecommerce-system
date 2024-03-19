import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Ingrese un correo valido.")
    .max(200)
    .required("El campo es requerido."),
  password: yup.string().required("El campo es requerido."),
});
