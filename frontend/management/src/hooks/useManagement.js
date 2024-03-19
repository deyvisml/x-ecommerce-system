import { useContext } from "react";
import ManagementContext from "../context/ManagementProvider";

const useManagement = () => {
  return useContext(ManagementContext);
};

export default useManagement;
