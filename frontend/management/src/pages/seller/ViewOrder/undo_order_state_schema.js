import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const undo_order_state_schema = yup.object({
  order_state_id: yup
    .number()
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
});
