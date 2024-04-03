import * as yup from "yup";

export const seller_schema = yup.object({
  email: yup
    .string()
    .email("Ingrese un correo valido.")
    .max(200)
    .required("El campo es requerido."),
  password: yup.string().required("El campo es requerido."),
  first_name: yup
    .string()
    .matches(/^[^\d]*$/, "Ingrese un valor valido")
    .max(50)
    .required("El campo es requerido"),
  last_name: yup
    .string()
    .matches(/^[^\d]*$/, "Ingrese un valor valido")
    .max(100)
    .required("El campo es requerido"),
  phone_number: yup
    .number()
    .typeError("El campo debe ser númerico")
    .positive()
    .integer()
    .required("El campo es requerido"),
  document_type_id: yup
    .number()
    .typeError("El campo debe ser númerico")
    .transform((v) => (!isNaN(v) ? v : null))
    .nullable(),
  document_number: yup
    .number()
    .typeError("El campo debe ser númerico")
    .when("document_type_id", {
      is: (val) => {
        return val;
      },
      then: (schema) =>
        schema.positive().integer().required("El campo es requerido"),
      otherwise: (schema) =>
        schema.transform((v) => (!isNaN(v) ? v : null)).nullable(),
    }),
  state_id: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
});
