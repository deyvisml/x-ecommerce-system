import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const edit_store_schema = yup.object({
  email: yup
    .string()
    .email("Ingrese un correo valido.")
    .max(200)
    .required("El campo es requerido."),
  password: yup.string().required("El campo es requerido."),
  first_name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "Ingrese un valor valido")
    .max(50)
    .required("El campo es requerido"),
  last_name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "Ingrese un valor valido")
    .max(100)
    .required("El campo es requerido"),
  phone_number: yup
    .number()
    .typeError("El campo debe ser númerico")
    .positive()
    .integer()
    .required("El campo es requerido"),
  store_name: yup.string().max(600).required("El campo es requerido"),
  ruc: yup
    .number()
    .typeError("El campo debe ser númerico")
    .positive()
    .integer()
    .required("El campo es requerido"),
  business_name: yup.string().max(600).required("El campo es requerido"),
  bank: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  bank_account_number: yup
    .number()
    .typeError("El campo debe ser númerico")
    .positive()
    .integer()
    .required("El campo es requerido"),
});
