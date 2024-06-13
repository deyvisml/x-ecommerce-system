import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

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

export const schema_with_token = yup.object({
  store_name: yup.string().max(80).required(),
  ruc: yup
    .string()
    .matches(/^[0-9]+$/)
    .required(),
  business_name: yup.string().max(200).required(),
  phone_number: yup
    .string()
    .matches(/^[0-9]+$/)
    .required(),
  legal_representative: yup
    .string()
    .matches(/^[^\d]*$/)
    .max(256)
    .required(),
  bank_id: yup.number().min(1).required(),
  bank_account_number: yup
    .string()
    .matches(/^[0-9]+$/)
    .required(),
});
