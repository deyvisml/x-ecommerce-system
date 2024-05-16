import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const schema_with_token = yup.object({
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
    .max(256)
    .required("El campo es requerido"),
  bank_id: yup
    .string()
    .matches(/^[0-9]+$/, "El campo debe ser númerico")
    .required("El campo es requerido"),
  bank_account_number: yup
    .string()
    .matches(/^[0-9]+$/, "El campo debe ser númerico")
    .required("El campo es requerido"),
});
