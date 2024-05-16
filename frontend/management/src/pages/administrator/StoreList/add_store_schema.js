import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const add_store_schema = yup.object({
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
    .max(600)
    .required("El campo es requerido"),
  user_id: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
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
  state_id: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
});
