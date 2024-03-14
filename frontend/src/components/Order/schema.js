import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const schema = yup.object({
  document_type: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  document_number: yup
    .number()
    .typeError("El campo debe ser númerico")
    .positive("El campo debe ser positivo")
    .integer()
    .required("El campo es requerido"),
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
  email: yup
    .string()
    .email("Ingrese un correo valido")
    .max(200)
    .required("El campo es requerido"),
  birthdate: yup
    .date()
    .nullable()
    .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
    .optional(),
  phone_number: yup
    .number()
    .typeError("El campo debe ser númerico")
    .positive()
    .integer()
    .required("El campo es requerido"),
  delivery_first_name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "Ingrese un valor valido")
    .max(50)
    .required("El campo es requerido"),
  delivery_last_name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "Ingrese un valor valido")
    .max(100)
    .required("El campo es requerido"),
  delivery_region: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  delivery_location: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  delivery_address: yup.string().max(300).required("El campo es requerido"),
  delivery_address_reference: yup
    .string()
    .max(300)
    .nullable()
    .transform((value) => (value ? value : null))
    .optional(),
  delivery_date: yup
    .date()
    .min(today, "Eliga una fecha valida")
    .typeError("El campo debe ser una fecha")
    .required("El campo es requerido"),
  delivery_schedule: yup
    .number()
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  delivery_phone_number: yup
    .number()
    .typeError("El campo debe ser númerico")
    .positive()
    .integer()
    .required("El campo es requerido"),
  payment_method: yup.string().required("El campo es requerido"),
  privacy_policies: yup
    .bool()
    .oneOf([true], "Debes aceptar la política de privacidad."),
  terms_service: yup
    .bool()
    .oneOf([true], "Debes aceptar los terminos de servicio."),
});
