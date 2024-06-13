import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "schema.mixed.required",
  },
  string: {
    email: "schema.string.email",
    max: ({ max }) => ({ key: "schema.string.max", values: { max } }),
    required: "schema.string.required",
  },
});

export const subscribe_newsletter_schema = yup.object({
  email: yup.string().email().max(70).required(),
});
