import React, { useState } from "react";
import SwitchInput from "../../../components/SwitchInput";
import axios_client from "../../../helpers/axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../../../hooks/useManagement";
import { useTranslation } from "react-i18next";

const SwitchStockInput = ({ record, state }) => {
  const { t } = useTranslation();
  const { token } = useManagement();
  const [is_enabled, setIsEnabled] = useState(state);

  const update_in_stock = async (in_stock) => {
    const response = await axios_client(
      `/api/products/${record.id}/update-in-stock`,
      {
        method: "put",
        data: {
          in_stock: in_stock,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  };

  const handle_click_switch_stock_input = async (new_state) => {
    try {
      const response = await update_in_stock(new_state);

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: t("alerts.titles.updated"),
          text: response.data.message,
          confirmButtonText: t("alerts.confirmation_button.continue"),
        });

        setIsEnabled(new_state);
      } else {
        Swal.fire({
          icon: "error",
          title: t("alerts.titles.error"),
          text: response.data.message,
          confirmButtonText: t("alerts.confirmation_button.continue"),
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  return (
    <SwitchInput
      value={is_enabled}
      onChange={handle_click_switch_stock_input}
    ></SwitchInput>
  );
};

export default SwitchStockInput;
