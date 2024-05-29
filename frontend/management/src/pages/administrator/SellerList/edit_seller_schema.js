import * as yup from "yup";

export const edit_seller_schema = yup.object({
  email: yup
    .string()
    .email("Ingrese un correo valido.")
    .max(
      100,
      ({ max }) => `El contenido es demasiado largo (max: ${max} caracteres)`
    )
    .required("El campo es requerido."),
  first_name: yup
    .string()
    .matches(/^[^\d]*$/, "Ingrese un valor valido")
    .max(50, ({ max }) => `Maximo ${max} caracteres)`)
    .required("El campo es requerido"),
  last_name: yup
    .string()
    .matches(/^[^\d]*$/, "Ingrese un valor valido")
    .max(50, ({ max }) => `Maximo ${max} caracteres)`)
    .required("El campo es requerido"),
  phone_number: yup
    .string()
    .matches(/^[0-9]+$/, "El campo debe ser númerico")
    .required("El campo es requerido"),
  document_type_id: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  document_number: yup
    .string()
    .max(20, ({ max }) => `Maximo ${max} caracteres)`)
    .matches(/^[0-9]+$/, "El campo debe ser númerico")
    .required("El campo es requerido"),
  state_id: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
});
