import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const schema = yup.object({
  name: yup.string().max(200).required("El campo es requerido"),
  sku: yup.string().max(20).required("El campo es requerido"),
  description: yup.string().max(600).required("El campo es requerido"),
  image: yup
    .array()
    .required("El campo es requerido")
    .length(1, "Seleccione un archivo"),
  price: yup
    .number()
    .typeError("El campo debe ser númerico")
    .positive("El campo debe ser positivo")
    .required("El campo es requerido"),
  discount_rate: yup
    .number()
    .typeError("El campo debe ser númerico")
    .min(0, "El campo debe ser mayor o igual que cero")
    .max(99, "El campo debe ser menor que cien")
    .integer("El campo debe ser un numero entero")
    .required("El campo es requerido"),
  has_stock: yup.boolean().required("El campo es requerido"),
  category_id: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  collection_id: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  state_id: yup
    .number()
    .min(1, "Eliga una opción valida")
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
});
