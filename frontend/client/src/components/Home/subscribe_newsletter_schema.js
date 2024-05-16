import * as yup from "yup";

export const subscribe_newsletter_schema = yup.object({
  email: yup
    .string()
    .email("Ingrese un correo valido")
    .max(
      100,
      ({ max }) => `El contenido es demasiado largo (max: ${max} caracteres)`
    )
    .required("El campo es requerido"),
});
