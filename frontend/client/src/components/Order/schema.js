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

export const schema = yup.object({
  document_type: yup.number().min(1).required(),
  document_number: yup
    .string()
    .matches(/^[0-9]+$/)
    .required(),
  first_name: yup
    .string()
    .matches(/^[^\d]*$/)
    .max(50)
    .required(),
  last_name: yup
    .string()
    .matches(/^[^\d]*$/)
    .max(100)
    .required(),
  email: yup.string().email().max(100).required(),
  birthdate: yup
    .date()
    .nullable()
    .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
    .optional(),
  phone_number: yup
    .string()
    .matches(/^[0-9]+$/)
    .required(),
  delivery_first_name: yup
    .string()
    .matches(/^[^\d]*$/)
    .max(50)
    .required(),
  delivery_last_name: yup
    .string()
    .matches(/^[^\d]*$/)
    .max(100)
    .required(),
  delivery_region: yup.number().min(1).required(),
  delivery_location: yup.number().min(1).required(),
  delivery_address: yup.string().max(200).required(),
  delivery_address_reference: yup
    .string()
    .max(200)
    .nullable()
    .transform((value) => (value ? value : null))
    .optional(),
  delivery_date: yup.date().min(today).required(),
  delivery_schedule: yup.number().min(1).required(),
  delivery_phone_number: yup
    .string()
    .matches(/^[0-9]+$/)
    .required(),
  purchase_occasion_id: yup.number().min(1).required(),
  no_send_message_card: yup.boolean().required(),
  dedication_message_id: yup.number().nullable(),
  dedication_message: yup.string().when("no_send_message_card", {
    is: false,
    then: (schema) => schema.max(500).required(),
    otherwise: (schema) => schema.nullable(),
  }),
  payment_method: yup.string().required(),
  privacy_policies: yup.bool().oneOf([true]),
  terms_service: yup.bool().oneOf([true]),
});
