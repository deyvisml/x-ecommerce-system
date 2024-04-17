import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const upload_documents_schema = yup.object({
  kind: yup
    .string()
    .oneOf(["ticket", "invoice", "shipping"], "El valor es invalido")
    .required("El campo es requerido"),
  file: yup
    .mixed()
    .test("required", "El campo es requerido", (files) => files.length != 0)
    .test("file_size", "El archivo debe pesar menos de 3mb", (files) =>
      Array.from(files).every((file) => file.size <= 3_000_000)
    )
    .test("file_format", "El formato es invalido", (files) =>
      Array.from(files).every((file) => file.type == "application/pdf")
    ),
});
