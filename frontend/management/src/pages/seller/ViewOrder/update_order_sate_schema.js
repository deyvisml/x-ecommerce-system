import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const update_order_sate_schema = yup.object({
  state_id: yup
    .number()
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  date: yup
    .date()
    .typeError("El campo debe ser una fecha")
    .required("El campo es requerido"),
  time: yup
    .string()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "Eliga una hora valida")
    .required("El campo es requerdio"),
});
