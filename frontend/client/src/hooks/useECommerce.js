import { useContext } from "react";
import ECommerceContext from "../context/ECommerceProvider";

const useECommerce = () => {
  return useContext(ECommerceContext);
};

export default useECommerce;
