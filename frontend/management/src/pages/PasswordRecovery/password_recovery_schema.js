import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

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

export const password_recovery_schema = yup.object({
  password: yup
    .string()
    .min(8)
    .max(40)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "schema.mixed.oneOfPassword")
    .required(),
});
