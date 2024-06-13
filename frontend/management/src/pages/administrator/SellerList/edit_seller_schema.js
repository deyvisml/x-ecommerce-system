import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "schema.mixed.required",
    notType: "schema.mixed.typeError",
    oneOf: ({ values }) => {
      return values.includes(true)
        ? "schema.mixed.oneOfTrue"
        : "schema.mixed.oneOfFalse";
    },
  },
  string: {
    email: "schema.string.email",
    min: ({ min }) => ({ key: "schema.string.min", values: { min } }),
    max: ({ max }) => ({ key: "schema.string.max", values: { max } }),
    matches: "schema.string.matches",
    minLowercase: ({ length }) => ({
      key: "schema.string.minLowercase",
      values: { length },
    }),
    minUppercase: ({ length }) => ({
      key: "schema.string.minUppercase",
      values: { length },
    }),
    minNumbers: ({ length }) => ({
      key: "schema.string.minNumbers",
      values: { length },
    }),
  },
  number: {
    min: "schema.number.min",
  },
  date: {
    min: "schema.date.min",
  },
});

export const edit_seller_schema = yup.object({
  email: yup.string().email().max(100).required(),
  first_name: yup
    .string()
    .matches(/^[^\d]*$/)
    .max(50)
    .required(),
  last_name: yup
    .string()
    .matches(/^[^\d]*$/)
    .max(50)
    .required(),
  phone_number: yup
    .string()
    .matches(/^[0-9]+$/)
    .required(),
  document_type_id: yup.number().min(1).required(),
  document_number: yup
    .string()
    .max(20)
    .matches(/^[0-9]+$/)
    .required(),
  state_id: yup.number().min(1).required(),
});
