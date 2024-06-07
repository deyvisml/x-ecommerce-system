import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { subscribe_newsletter_schema } from "./subscribe_newsletter_schema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios_client from "../../helpers/axios";
import { useTranslation } from "react-i18next";

const SubscribeNewsletter = () => {
  const { t } = useTranslation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subscribe_newsletter_schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios_client("api/newsletter-subscribers", {
        method: "post",
        data,
      });

      if (!response.data.status) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email.message);
    }
  }, [errors]);

  return (
    <div className="flex flex-col items-center gap-y-4 bg-white px-4 sm:px-12 py-16 text-center">
      <p className="text-3xl">{t("suscribe_newsletter.title")}</p>
      <p className="text-sm sm:text-base">
        {t("suscribe_newsletter.description")}
      </p>

      <form className="w-full" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="flex sm:flex-row flex-col justify-center gap-x-5 gap-y-3">
          <input
            {...register("email")}
            type="email"
            maxLength={50}
            className={`border-gray-400 px-3 p-2  ${
              errors.email ? "border-red-400 focus:border-red-400" : ""
            }  border rounded-xl w-full sm:max-w-sm outline-none`}
            placeholder={t("suscribe_newsletter.email_input.placeholder")}
          />

          <button
            type="submit"
            className="hover:bg-rose-500 px-10 p-2 border border-rose-600 rounded-xl text-rose-600 hover:text-white transition-all duration-300 ease-in-out"
          >
            {t("suscribe_newsletter.button_text")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscribeNewsletter;
