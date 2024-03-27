import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const edit_store_schema = yup.object({
  store_name: yup.string().max(600).required("El campo es requerido"),
  ruc: yup
    .number()
    .typeError("El campo debe ser númerico")
    .positive()
    .integer()
    .required("El campo es requerido"),
  business_name: yup.string().max(600).required("El campo es requerido"),
  seller_id: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  bank_id: yup
    .number()
    .min(0, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  bank_account_number: yup
    .number()
    .typeError("El campo debe ser númerico")
    .when("bank_id", {
      is: (val) => val > 0,
      then: (schema) =>
        schema.positive().integer().required("El campo es requerido"),
      otherwise: (schema) =>
        schema
          .transform((v) => (v instanceof Number && !isNaN(v) ? v : null))
          .nullable(),
    }),
  state_id: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
});
