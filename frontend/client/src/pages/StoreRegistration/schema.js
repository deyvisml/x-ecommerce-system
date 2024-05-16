import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const schema = yup.object({
  email: yup
    .string()
    .email("Ingrese un correo valido.")
    .max(
      100,
      ({ max }) => `El contenido es demasiado largo (max: ${max} caracteres)`
    )
    .required("El campo es requerido."),
  password: yup
    .string()
    .max(
      40,
      ({ max }) => `El contenido es demasiado largo (max: ${max} caracteres)`
    )
    .required("El campo es requerido."),
  first_name: yup
    .string()
    .matches(/^[^\d]*$/, "Ingrese un valor valido")
    .max(
      50,
      ({ max }) => `El contenido es demasiado largo (max: ${max} caracteres)`
    )
    .required("El campo es requerido"),
  last_name: yup
    .string()
    .matches(/^[^\d]*$/, "Ingrese un valor valido")
    .max(
      100,
      ({ max }) => `El contenido es demasiado largo (max: ${max} caracteres)`
    )
    .required("El campo es requerido"),
  user_phone_number: yup
    .string()
    .matches(/^[0-9]+$/, "El campo debe ser númerico")
    .required("El campo es requerido"),
  document_type: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  document_number: yup
    .string()
    .matches(/^[0-9]+$/, "El campo debe ser númerico")
    .required("El campo es requerido"),
  store_name: yup
    .string()
    .max(
      80,
      ({ max }) => `El contenido es demasiado largo (max: ${max} caracteres)`
    )
    .required("El campo es requerido"),
  ruc: yup
    .string()
    .matches(/^[0-9]+$/, "El campo debe ser númerico")
    .required("El campo es requerido"),
  business_name: yup
    .string()
    .max(
      200,
      ({ max }) => `El contenido es demasiado largo (max: ${max} caracteres)`
    )
    .required("El campo es requerido"),
  phone_number: yup
    .string()
    .matches(/^[0-9]+$/, "El campo debe ser númerico")
    .required("El campo es requerido"),
  legal_representative: yup
    .string()
    .matches(/^[^\d]*$/, "Ingrese un valor valido")
    .max(
      100,
      ({ max }) => `El contenido es demasiado largo (max: ${max} caracteres)`
    )
    .required("El campo es requerido"),
  bank_id: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  bank_account_number: yup
    .string()
    .matches(/^[0-9]+$/, "El campo debe ser númerico")
    .required("El campo es requerido"),
});
