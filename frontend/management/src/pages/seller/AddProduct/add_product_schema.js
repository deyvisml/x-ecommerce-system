import { isNull } from "lodash";
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
    max: ({ max }) => ({ key: "schema.number.max", values: { max } }),
    integer: "schema.number.integer",
    positive: "schema.number.positive",
  },
  array: {
    min: ({ min }) => ({ key: "schema.array.min", values: { min } }),
    max: ({ max }) => ({ key: "schema.array.max", values: { max } }),
  },
  date: {
    min: "schema.date.min",
  },
  image: {},
});

export const add_product_schema = yup.object({
  name: yup.string().max(200).required(),
  sku: yup.string().max(20).required(),
  description: yup.string().max(600).required(),
  images: yup.array().min(1).max(3).required(),
  price: yup.number().positive().required(),
  discount_rate: yup
    .number()
    .min(0, ({ min }) => ({ key: "schema.number.min2", values: { min } }))
    .max(99)
    .integer()
    .required(),
  quantity: yup
    .number()
    .min(0, ({ min }) => ({ key: "schema.number.min2", values: { min } }))
    .integer()
    .required(),
  in_stock: yup.boolean().required(),
  is_customizable: yup.boolean().required(),
  customization_label: yup.string().when("is_customizable", {
    is: true,
    then: (schema) => schema.max(150).required(),
    otherwise: (schema) => schema.nullable(),
  }),
  category_id: yup.number().min(1).required(),
  collection_id: yup.number().min(1).required(),
  state_id: yup.number().min(1).required(),
  publish_now: yup.boolean().required(),
  publish_date: yup.date().when("publish_now", {
    is: false,
    then: (schema) =>
      schema
        .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
        .required(),
    otherwise: (schema) => schema.transform((v) => null).nullable(),
  }),
  publish_time: yup.string().when("publish_now", {
    is: false,
    then: (schema) =>
      schema.transform((v) => (!isNull(v) ? v : null)).required(),
    otherwise: (schema) => schema.nullable(),
  }),
});
